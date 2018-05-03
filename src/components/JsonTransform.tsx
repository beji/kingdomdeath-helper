import items from "data/raw/armor.json";
import items2 from "data/raw/items.json";
import weapons from "data/raw/weapons.json";
import React from "react";
import { DefenseStats, Item, ItemType, StatType } from "../interfaces";

class JsonTransform extends React.Component {

    public render() {
        return (
            <div>
                <h1>JSON</h1>
                {JSON.stringify(this.transformItems())}
                <h1>ID</h1>
                {JSON.stringify(this.getItemIDs())}
            </div>
        );
    }

    private transformItems() {
        return items2.map((data) => {
            return {
                desc: data.desc,
                id: (Item as any)[data.name.replace(/ /g, "_").replace(/['()]/g, "").replace("-", "_").toLowerCase()],
                material: data.material,
                name: data.name,
                obtained: data.obtained,
                types: data.desc.split(".")[0].split(",").map((t: string) => {
                    return (ItemType as any)[t.trim()];
                }).filter((e: any) => e),
            };
        });
    }

    private getItemTypes() {
        const data = this.transformItems();
        const types = data.map((d: any) => {
            return d.types.map((t: string) => t);
        }).join().split(",");
        return [...new Set(types)];
    }

    private getItemIDs() {
        const data = this.transformItems();
        return data.map((item) => {
            return item.name.replace(/ /g, "_").replace(/['()]/g, "").replace("-", "_").toLowerCase();
        });
    }

    private transformWeapon() {
        return weapons.map((data: any) => {
            return {
                desc: data.desc,
                id: (Item as any)[data.name.replace(/ /g, "_").replace("'", "").replace("-", "_").toLowerCase()],
                material: data.material,
                name: data.name,
                obtained: data.obtained,
                types: data.desc.split(".")[0].split(",").map((t: string) => {
                    return (ItemType as any)[t.trim()];
                }).filter((e: any) => e),
                weapon: {
                    accuracy: data.accuracy,
                    speed: data.speed,
                    strength: data.stength,
                },
            };
        });
    }

    private getWeaponTypes() {
        const data = this.transformWeapon();
        const types = data.map((d: any) => {
            return d.types.map((t: string) => t);
        }).join().split(",");
        return [...new Set(types)];
    }

    private getWeapIDs() {
        const data = this.transformWeapon();
        return data.map((item) => {
            return item.name.replace(/ /g, "_").replace("'", "").replace("-", "_").toLowerCase();
        });
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
