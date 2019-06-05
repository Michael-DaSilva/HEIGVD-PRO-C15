import {Component, OnInit} from '@angular/core';
import {APIDatasService} from '../../services/apidatas.service';
import {Bacterium} from '../../models/bacterium';
import {flatMap} from 'rxjs/operators';
import {Contig} from '../../models/contig';
import {concat, Observable} from 'rxjs';
import {WholeDNA} from '../../models/wholeDNA';

@Component({
  selector: 'app-bacterium-view',
  templateUrl: './bacterium-view.component.html',
  styleUrls: ['./bacterium-view.component.scss']
})
export class BacteriumViewComponent implements OnInit {
  bacterium = {organism_contig: [], organism_wholeDNA: []} as Bacterium;
  personResponsible = '';
  wholeContig = '';
  wholeDNA = '';

  constructor(private api: APIDatasService) {

  }

  ngOnInit() {
    this.api.getDatas('/bacterium/5881/')
      .pipe(flatMap((res: Bacterium) => {
        this.bacterium = res;
        console.log('bacterum', this.bacterium);

        // DNA
        concat(...this.bacterium.organism_wholeDNA.map(url => this.api.getDatasRawUrl(url) as Observable<WholeDNA>)).subscribe(
          contig => this.wholeDNA += contig.sequence_DNA
        );

        // Contig
        concat(...this.bacterium.organism_contig.map(url => this.api.getDatasRawUrl(url) as Observable<Contig>)).subscribe(
          contig => this.wholeContig += contig.sequence_DNA
        );
        return this.api.getDatas('/personresp/' + res.person_responsible + '/');
      })).subscribe(person => this.personResponsible = person.name);

  }

}
