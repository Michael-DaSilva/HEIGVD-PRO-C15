export interface Gene {
    id                      : number,
    id_db_online            : any,
    sequence_DNA            : string,
    fasta_head              : string,
    position_start          : number,
    position_end            : number,
    number_of_seq           : any,
    organism                : number,
    position_start_contig   : any,
    position_end_contig     : any,
    protein_gene            : string[],
    contig                  : any
}