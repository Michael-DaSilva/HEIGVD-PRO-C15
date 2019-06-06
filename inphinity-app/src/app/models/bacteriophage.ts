export interface Bacteriophage {
  id: number;
  acc_number: string;
  organism_contig: string[];
  organism_gene: string[];
  organism_wholeDNA: string[];
  person_responsible: number;
  protein_organism: string[];
  source_data: number;
  strain: number;
}
