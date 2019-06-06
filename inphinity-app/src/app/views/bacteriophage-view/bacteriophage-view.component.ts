import {Component, OnInit, ViewChild} from '@angular/core';
import {APIDatasService} from '../../services/apidatas.service';
import {Bacteriophage} from '../../models/bacteriophage';
import {flatMap} from 'rxjs/operators';
import {Contig} from '../../models/contig';
import {concat, Observable} from 'rxjs';
import {WholeDNA} from '../../models/wholeDNA';
import { Gene } from 'src/app/models/gene';
import { InphPieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-bacteriophage-view',
  templateUrl: './bacteriophage-view.component.html',
  styleUrls: ['./bacteriophage-view.component.scss'] 
})
export class BacteriophageViewComponent implements OnInit {

  @ViewChild('dnaChart')    dnaChart    : InphPieChartComponent;
  @ViewChild('contilChart') contilChart : InphPieChartComponent;
  @ViewChild('geneChart')   geneChart   : InphPieChartComponent;

  bacteriophage = {organism_contig: [], organism_wholeDNA: []} as Bacteriophage;
  personResponsible = '';
  wholeDNA      : {text : string, elems : {name : string, value : number}[]} = {text : "", elems : []};
  wholeContig   : {text : string, elems : {name : string, value : number}[]} = {text : "", elems : []};
  wholeGenes    : {text : string, elems : {name : string, value : number}[]} = {text : "", elems : []};

  constructor(private api: APIDatasService) { }

  getStatistics(sourceText : string, dest){
    for(var _i=0; _i < sourceText.length; _i++){
      if(dest.find(x => x.name === sourceText[_i]) === undefined)
          dest.push({name : sourceText[_i], value : 1});
      else
          dest.find(x => x.name === sourceText[_i]).value++;
    } 
  }

  ngOnInit() {
    
    this.api.getDatas('/bacteriophage/4817/')
    .pipe(flatMap((res: Bacteriophage) => {
      this.bacteriophage = res;
      console.log('bacterum', this.bacteriophage);

      // DNA
      concat(...this.bacteriophage.organism_wholeDNA.map(url => this.api.getDatasRawUrl(url) as Observable<WholeDNA>)).subscribe(
        dna => {this.wholeDNA.text += dna.sequence_DNA;},
        error => {},
        () =>{ this.getStatistics(this.wholeDNA.text, this.wholeDNA.elems); this.dnaChart.updateGraphDatas(this.wholeDNA.elems)}
      );

      // Contig
      concat(...this.bacteriophage.organism_contig.map(url => this.api.getDatasRawUrl(url) as Observable<Contig>)).subscribe(
        contig => this.wholeContig.text += contig.sequence_DNA,
        error => {},
        () =>{ this.getStatistics(this.wholeContig.text, this.wholeContig.elems); this.contilChart.updateGraphDatas(this.wholeContig.elems)}
      );

      //Gene
      concat(...this.bacteriophage.organism_gene.map(url => this.api.getDatasRawUrl(url) as Observable<Gene>)).subscribe(
        gene => this.wholeGenes.text += gene.sequence_DNA,
        error => {},
        () =>{ this.getStatistics(this.wholeGenes.text, this.wholeGenes.elems); this.geneChart.updateGraphDatas(this.wholeGenes.elems)}
      );
      return this.api.getDatas('/personresp/' + res.person_responsible + '/');
    })).subscribe(person => this.personResponsible = person.name);
  }

}
