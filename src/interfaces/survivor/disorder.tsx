export const enum Disorders {
    absent_seizures,
    aichmophobia,
    anxiety,
    apathetic,
    arithmophilia,
    binge_eating_disorder,
    bloodthirsty,
    controlophobia,
    coprolalia,
    delicious,
    destined,
    emotionless,
    enfeebled,
    fair_fighter,
    fear_of_the_dark,
    flower_addiction,
    ghostly_beauty,
    hemophobia,
    hoarder,
    honorable,
    hypersensitivity,
    hyperactive,
    immortal,
    indecision,
    megalophobia,
    monster_panic,
    motion_sickness,
    narcissistic,
    overprotective,
    performance_anxiety,
    posttraumatic_stress,
    prey,
    prima_donna,
    quixotic,
    rageholic,
    revenge,
    secretive,
    seizures,
    shallow_lungs,
    social_anxiety,
    spiral_ganglia,
    squeamish,
    stage_fright,
    stark_raving,
    sundrunk,
    superstitious,
    tiny_arachnophobia,
    traumatized,
    tunnel_vision,
    unlucky,
    vermin_obsession,
    vestiphobia,
    weak_spot,
}

export interface IDisorder {
    readonly id: Disorders;
    readonly name: string;
    readonly description: string;
}
