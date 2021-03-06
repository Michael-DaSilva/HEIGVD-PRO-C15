import {Component, OnInit, ViewChild} from '@angular/core';
import {APIDatasService} from '../../services/apidatas.service';
import {Bacterium} from '../../models/bacterium';
import {flatMap} from 'rxjs/operators';
import {Contig} from '../../models/contig';
import {concat, Observable} from 'rxjs';
import {WholeDNA} from '../../models/wholeDNA';
import { Gene } from 'src/app/models/gene';
import { InphPieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-bacterium-view',
  templateUrl: './bacterium-view.component.html',
  styleUrls: ['./bacterium-view.component.scss']
})
export class BacteriumViewComponent implements OnInit {
  bacterium = {organism_contig: [], organism_wholeDNA: []} as Bacterium;

  @ViewChild('dnaChart')    dnaChart    : InphPieChartComponent;
  @ViewChild('contilChart') contilChart : InphPieChartComponent;
  @ViewChild('geneChart')   geneChart   : InphPieChartComponent;

  personResponsible = '';
  wholeDNA      : {text : string, elems : {name : string, value : number}[]} = {text : "", elems : []};
  wholeContig   : {text : string, elems : {name : string, value : number}[]} = {text : "", elems : []};
  wholeGenes    : {text : string, elems : {name : string, value : number}[]} = {text : "", elems : []};
  constructor(private api: APIDatasService) {

  }
  getStatistics(sourceText : string, dest){
    for(var _i=0; _i < sourceText.length; _i++){
      if(dest.find(x => x.name === sourceText[_i]) === undefined)
          dest.push({name : sourceText[_i], value : 1});
      else
          dest.find(x => x.name === sourceText[_i]).value++;
    } 
  }

  ngOnInit() {
    
    this.api.getDatas('/bacterium/5881/')
    .pipe(flatMap((res: Bacterium) => {
      this.bacterium = res;
      console.log('bacterum', this.bacterium);

      // DNA
      concat(...this.bacterium.organism_wholeDNA.map(url => this.api.getDatasRawUrl(url) as Observable<WholeDNA>)).subscribe(
        dna => {this.wholeDNA.text += dna.sequence_DNA;},
        error => {},
        () =>{ this.getStatistics(this.wholeDNA.text, this.wholeDNA.elems); this.dnaChart.updateGraphDatas(this.wholeDNA.elems)}
      );

      // Contig
      concat(...this.bacterium.organism_contig.map(url => this.api.getDatasRawUrl(url) as Observable<Contig>)).subscribe(
        contig => this.wholeContig.text += contig.sequence_DNA,
        error => {},
        () =>{ this.getStatistics(this.wholeContig.text, this.wholeContig.elems); this.contilChart.updateGraphDatas(this.wholeContig.elems)}
      );

      //Gene
      concat(...this.bacterium.organism_gene.map(url => this.api.getDatasRawUrl(url) as Observable<Gene>)).subscribe(
        gene => this.wholeGenes.text += gene.sequence_DNA,
        error => {},
        () =>{ this.getStatistics(this.wholeGenes.text, this.wholeGenes.elems); this.geneChart.updateGraphDatas(this.wholeGenes.elems)}
      );
      return this.api.getDatas('/personresp/' + res.person_responsible + '/');
    })).subscribe(person => this.personResponsible = person.name);
  }

}
