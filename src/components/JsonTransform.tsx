import items from "data/raw/armor.json";
import React from "react";
import { DefenseStats, Item, ItemType, StatType } from "../interfaces";

class JsonTransform extends React.Component {

    public render() {
        return (
            <div>
                <h1>JSON</h1>
                {JSON.stringify(this.transformArmor())}
                <h1>ids</h1>
                {JSON.stringify(this.getIDs())}
            </div>
        );
    }

    private transformArmor() {
        const statMap = ["stats.head", "Stats.arms",  "stats.body", "stats.waist", "stats.legs"];
        return items.map((data: any) => {
            return {
                desc: data.desc,
                id: (Item as any)[data.name.replace(/ /g, "_").replace("'", "").toLowerCase()],
                material: data.material,
                name: data.name,
                obtained: data.obtained,
                stats: statMap.map((stat) => {
                    if ( typeof data[stat] === "number" ) {
                        const statTypeString: string = stat.split(".")[1];
                        const statType: DefenseStats = (DefenseStats as any)[statTypeString];
                        return {
                            amount: data[stat],
                            showOnCard: true,
                            stat: statType,
                            type: StatType.defense,
                        };
                    }
                }).filter((e) => e && e.amount > 0),
                types: [0].concat(data.types.replace("[", "") .replace("]", "").split(",").map((t: string) => {
                    return (ItemType as any)[t.trim()];
                }).filter((e: any) => e)),
            };
        });
    }

    private getArmorTypes() {
        const data = this.transformArmor();
        const types = data.map((d: any) => {
            return d.types.map((t: string) => t);
        }).join().split(",");
        return [...new Set(types)];
    }

    private getIDs() {
        const data = this.transformArmor();
        const ids = data.map((item: any) => item.id);
        return ids;
    }

}

export default JsonTransform;
