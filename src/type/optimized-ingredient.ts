export interface OptimizedIngredient {
    optim_total_nutrition: {
        "Air (ml)": number,
        "Energi (kal)": number,
        "Karbohidrat (gram)": number,
        "Lemak (gram)": number,
        "Protein (gram)": number,
        "Serat (gram)": number
    },
    optimized_ingredients: string[],
    user_threshold: {
        "Air (ml)": number,
        "Berat Badan (kg)": number,
        "Energi (kal)": number,
        "Gender": string,
        "Karbohidrat (gram)": number,
        "Kelompok Umur": string,
        "Lemak (gram)": number,
        "Protein (gram)": number,
        "Serat (gram)": number,
        "Tinggi Badan (cm)": number
    }
}