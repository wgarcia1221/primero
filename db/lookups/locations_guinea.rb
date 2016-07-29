#Country
Location.create! placename: "Guinea", admin_level: 0, type: "country"

#region
Location.create! placename:"Kindia", type: "region", hierarchy: ["Guinea"]
Location.create! placename:"Nzerekore", type: "region", hierarchy: ["Guinea"]
Location.create! placename:"Labe", type: "region", hierarchy: ["Guinea"]
Location.create! placename:"Mamou", type: "region", hierarchy: ["Guinea"]
Location.create! placename:"Faranah", type: "region", hierarchy: ["Guinea"]
Location.create! placename:"Conakry", type: "region", hierarchy: ["Guinea"]
Location.create! placename:"Kankan", type: "region", hierarchy: ["Guinea"]
Location.create! placename:"Boke", type: "region", hierarchy: ["Guinea"]

#prefecture
Location.create! placename:"Coyah", type: "prefecture", hierarchy: ["Guinea", "Kindia"]
Location.create! placename:"Yomou", type: "prefecture", hierarchy: ["Guinea", "Nzerekore"]
Location.create! placename:"Lelouma", type: "prefecture", hierarchy: ["Guinea", "Labe"]
Location.create! placename:"Nzerekore", type: "prefecture", hierarchy: ["Guinea", "Nzerekore"]
Location.create! placename:"Lola", type: "prefecture", hierarchy: ["Guinea", "Nzerekore"]
Location.create! placename:"Mamou", type: "prefecture", hierarchy: ["Guinea", "Mamou"]
Location.create! placename:"Gueckedou", type: "prefecture", hierarchy: ["Guinea", "Nzerekore"]
Location.create! placename:"Macenta", type: "prefecture", hierarchy: ["Guinea", "Nzerekore"]
Location.create! placename:"Beyla", type: "prefecture", hierarchy: ["Guinea", "Nzerekore"]
Location.create! placename:"Kissidougou", type: "prefecture", hierarchy: ["Guinea", "Faranah"]
Location.create! placename:"Forecariah", type: "prefecture", hierarchy: ["Guinea", "Kindia"]
Location.create! placename:"Conakry", type: "prefecture", hierarchy: ["Guinea", "Conakry"]
Location.create! placename:"Kerouane", type: "prefecture", hierarchy: ["Guinea", "Kankan"]
Location.create! placename:"Dalaba", type: "prefecture", hierarchy: ["Guinea", "Mamou"]
Location.create! placename:"Dubreka", type: "prefecture", hierarchy: ["Guinea", "Kindia"]
Location.create! placename:"Pita", type: "prefecture", hierarchy: ["Guinea", "Mamou"]
Location.create! placename:"Faranah", type: "prefecture", hierarchy: ["Guinea", "Faranah"]
Location.create! placename:"Boffa", type: "prefecture", hierarchy: ["Guinea", "Boke"]
Location.create! placename:"Fria", type: "prefecture", hierarchy: ["Guinea", "Boke"]
Location.create! placename:"Boke", type: "prefecture", hierarchy: ["Guinea", "Boke"]
Location.create! placename:"Kankan", type: "prefecture", hierarchy: ["Guinea", "Kankan"]
Location.create! placename:"Dabola", type: "prefecture", hierarchy: ["Guinea", "Faranah"]
Location.create! placename:"Labe", type: "prefecture", hierarchy: ["Guinea", "Labe"]
Location.create! placename:"Kouroussa", type: "prefecture", hierarchy: ["Guinea", "Kankan"]
Location.create! placename:"Mandiana", type: "prefecture", hierarchy: ["Guinea", "Kankan"]
Location.create! placename:"Tougue", type: "prefecture", hierarchy: ["Guinea", "Labe"]
Location.create! placename:"Koubia", type: "prefecture", hierarchy: ["Guinea", "Labe"]
Location.create! placename:"Dinguiraye", type: "prefecture", hierarchy: ["Guinea", "Faranah"]
Location.create! placename:"Gaoual", type: "prefecture", hierarchy: ["Guinea", "Boke"]
Location.create! placename:"Mali", type: "prefecture", hierarchy: ["Guinea", "Labe"]
Location.create! placename:"Siguiri", type: "prefecture", hierarchy: ["Guinea", "Kankan"]
Location.create! placename:"Koundara", type: "prefecture", hierarchy: ["Guinea", "Boke"]
Location.create! placename:"Kindia", type: "prefecture", hierarchy: ["Guinea", "Kindia"]
Location.create! placename:"Telimele", type: "prefecture", hierarchy: ["Guinea", "Kindia"]
