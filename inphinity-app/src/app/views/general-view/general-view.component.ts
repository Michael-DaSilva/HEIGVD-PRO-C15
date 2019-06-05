import {Component, OnInit, ViewChild} from '@angular/core';
import {APIDatasService} from '../../services/apidatas.service';
import {AuthService} from '../../services/auth.service';
import {Family} from 'src/app/models/family';
import {Genus} from '../../models/genus';
import {Couple} from 'src/app/models/couple';
import {Specie} from '../../models/specie';
import {InphPieChartComponent} from 'src/app/components/pie-chart/pie-chart.component';
import {BarChartComponent} from 'src/app/components/bar-chart/bar-chart.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})

export class GeneralViewComponent implements OnInit {

  @ViewChild('familiesChart') famChart: InphPieChartComponent;
  @ViewChild('interactionsChart') interChart: InphPieChartComponent;
  @ViewChild('NoContig') noContigChart: BarChartComponent;
  @ViewChild('genusesChart') genChart: InphPieChartComponent;
  @ViewChild('speciesChart') speChart: InphPieChartComponent;
  @ViewChild('DNAContig') DNAContigChart: BarChartComponent;
  contigProteinLengthData: Array<string | number>[];
  contigLengthData: Array<string | number>[];
  dnaLengthData: Array<string | number>[];
  proteinCountData: Array<string | number>[];
  geneCountData: Array<string | number>[];

  @ViewChild("content") modalContent: any;

  constructor(private api: APIDatasService, private authService: AuthService) {

  }

  ngOnInit() {
    this.fetchData('family', 0);
    this.fetchData('genus', 0);
    this.fetchData('specie', 0);
    this.fetchData('couple', 0);

    // temp values
    this.fetchDNAContigData();
    this.fetchNoContigData();
    this.fetchContigProteinLengthData();
    this.fetchContigLengthData();
    this.fetchDnaLengthData();
    this.fetchGeneCountData();
    this.fetchProteinCountData();
  }

  fetchNoContigData() {
    const data = [
      {
        name: '0 - 10',
        series: [
          {
            name: 'Bacteriums',
            value: 100
          },
          {
            name: 'Bacteriophages',
            value: 50
          }
        ]
      },
      {
        name: '10 - 20',
        series: [
          {
            name: 'Bacteriums',
            value: 120
          },
          {
            name: 'Bacteriophages',
            value: 75
          }
        ]
      },
      {
        name: '20 - 30',
        series: [
          {
            name: 'Bacteriums',
            value: 110
          },
          {
            name: 'Bacteriophages',
            value: 48
          }
        ]
      },
      {
        name: '30 - 40',
        series: [
          {
            name: 'Bacteriums',
            value: 50
          },
          {
            name: 'Bacteriophages',
            value: 45
          }
        ]
      },
      {
        name: '40 - 50',
        series: [
          {
            name: 'Bacteriums',
            value: 44
          },
          {
            name: 'Bacteriophages',
            value: 21
          }
        ]
      },
      {
        name: '50+',
        series: [
          {
            name: 'Bacteriums',
            value: 25
          },
          {
            name: 'Bacteriophages',
            value: 20
          }
        ]
      },
    ];
    this.noContigChart.updateGraphDatas(data, 'Nb of contigs', 'Frequency');
  }

  fetchDNAContigData() {
    const data = [
      {
        name: 'Whole DNA',
        series: [
          {
            name: 'Bacteriums',
            value: 1275
          },
          {
            name: 'Bacteriophages',
            value: 867
          }
        ]
      },

      {
        name: 'Contig',
        series: [
          {
            name: 'Bacteriums',
            value: 1013
          },
          {
            name: 'Bacteriophages',
            value: 786
          }
        ]
      }
    ];
    this.DNAContigChart.updateGraphDatas(data, '', 'Frequency');
  }

  fetchContigProteinLengthData() {
    this.contigProteinLengthData = [
      ['Contig (average)', 100, 250, 600, 800],
      ['Protein', 90, 150, 400, 600]
    ];
  }

  fetchContigLengthData() {
    this.contigLengthData = [
      ['Bacteriums', 100, 250, 600, 800],
      ['Bacteriophages', 90, 150, 400, 600]
    ];
  }

  fetchDnaLengthData() {
    this.dnaLengthData = [
      ['Bacteriums', 100, 250, 600, 800],
      ['Bacteriophages', 90, 150, 400, 600]
    ];
  }

  fetchProteinCountData() {
    this.proteinCountData = [
      ['Bacteriums', 100, 250, 600, 800],
      ['Bacteriophages', 90, 150, 400, 600]
    ];
  }

  fetchGeneCountData() {
    this.geneCountData = [
      ['Bacteriums', 100, 250, 600, 800],
      ['Bacteriophages', 90, 150, 400, 600]
    ];
  }

  /**
   * author : R. Fournier
   * updated: M. Da Silva, 04.06.2019
   * goal   : Send GET request to API and returns the results (via exceptions)
   *
   * parameters : type : string of the contents asked
   *              id : number to filter which contents print by id (used for genus and specie)
   */
  fetchData(type: string, id: number) {
    const Res = this.api.getDatas('/' + type + '/');
    let array: any[];

    if (typeof (Res) !== 'undefined') {
      Res.subscribe(
        res => {
          if (type === 'couple') {
            array = res as Couple[];
          } else if (type === 'family') {
            array = res as Family[];
          } else if (type === 'genus') {
            array = res as Genus[];
          } else if (type === 'specie') {
            array = res as Specie[];
          }
        },
        error => {
          console.log('Error getting couples');
          console.log(error);
        },
        () => {
          if (type === 'couple') {
            this.interChart.updateGraphDatas(this.IntercationsToGraphData(array));
          } else if (type === 'family') {
            this.famChart.updateGraphDatas(this.RegroupDatas(this.FamiliesToGraphData(array),this.famChart ));
          } else if (type === 'genus') {
            this.genChart.updateGraphDatas(this.RegroupDatas(this.GenusToGraphData(array, id), this.genChart));
          } else if (type === 'specie') {
            this.speChart.updateGraphDatas(this.RegroupDatas(this.SpeciesToGraphData(array, id), this.speChart));
          }
        });
    }

  }

  /**
   * author : R. Fournier
   * updated: M. Da Silva, 04.06.2019
   * goal   : Calculate the values for the pie chart of Interaction
   *
   * parameters : couples : Array of type Couple who contains the couples from the data base
   */
  private IntercationsToGraphData(couples: Array<Couple>): any[] {
    const result = new Array<any>();
    let positive = 0;
    let negative = 0;

    for (const value of couples) {
      if (value.interaction_type) {
        positive++;
      } else {
        negative++;
      }
    }

    result.push({
      name: 'positive',
      value: positive
    });
    result.push({
      name: 'negative',
      value: negative
    });

    return result;
  }

  /**
   * author : R. Fournier
   * updated: M. Da Silva, 04.06.2019
   * goal   : Calculate the values for the pie chart of Family
   *
   * parameters : datas : Array of type Family who contains the families from the data base
   */
  private FamiliesToGraphData(datas: Array<Family>): any[] {
    const result = new Array<any>();
    for (const value of datas) {
      result.push(
        {
          name: value.designation,
          value: value.genuses.length
        });
    }

    result.sort((a, b) => {
      return a.value - b.value;
    }).reverse();

    // result = this.RegroupDatas(result);
    return result;
  }

  /**
   * author : R. Fournier
   * updated: M. Da Silva, 04.06.2019
   * goal   : Calculate the values for the pie chart of Genus
   *
   * parameters : datas : Array of type Genus who contains the genuses from the data base
   *              family: number (id) of the family searched (for filtering)
   */
  private GenusToGraphData(datas: Array<Genus>, family: number): any[] {
    const result = new Array<any>();
    if (family) {
      for (const value of datas) {
        if (value.family === family) {
          result.push(
            {
              name: value.designation,
              value: value.species.length
            });
        }
      }
    } else {
      for (const value of datas) {
        result.push(
          {
            name: value.designation,
            value: value.species.length
          });
      }
    }

    result.sort((a, b) => {
      return a.value - b.value;
    }).reverse();

    // result = this.RegroupDatas(result);
    return result;
  }

  /**
   * author : R. Fournier
   * updated: M. Da Silva, 04.06.2019
   * goal   : Calculate the values for the pie chart of Specie
   *
   * parameters : datas : Array of type Specie who contains the species from the data base
   *              genus: number (id) of the genus searched (for filtering)
   */
  private SpeciesToGraphData(datas: Array<Specie>, genus: number): any[] {
    const result = new Array<any>();
    if (genus) {
      for (const value of datas) {
        if (value.genus === genus) {
          result.push(
            {
              name: value.designation,
              value: value.strains.length
            });
        }
      }
    } else {
      for (const value of datas) {
        result.push(
          {
            name: value.designation,
            value: value.strains.length
          });
      }
    }

    result.sort((a, b) => {
      return a.value - b.value;
    }).reverse();

    // result = this.RegroupDatas(result);
    return result;
  }

  /**
   * author : M. Da Silva
   * goal   : Regroup the datas for better reading in pie charts
   *
   * parameters : datas : Array of datas who contains the values to regroup accordingly
   */
  private RegroupDatas(datas: Array<any>, target): any[] {
    let others = 0;

    let result = [];
    let tmp =[];

    if (datas.length > 4) {
      result.push(datas[0]);
      result.push(datas[1]);
      result.push(datas[2]);

      for (var _i = 3; _i < datas.length; _i++ ) {
        others += datas[_i].value;
        tmp.push(datas[_i]);
      }
      result.push({
        name: 'Others',
        value: others,
      });
      target.setAdditionnalDatas('Others', tmp, true);
      return result;
    } else {
      return datas;
    }
  }
}
