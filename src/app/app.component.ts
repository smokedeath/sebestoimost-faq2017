import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app works!';
  aindex: any;
  visibleOtvPanel = false;
  search = '';
  searchModel = [];
  otvModel = [];

  searchVop(){
    let vopId = 0;
    let vopSearchModel = [];
    this.searchModel = [];
    for (let i=0; i<this.faq.length; i++){
      if (this.faq[i].quest.indexOf(this.search)>=0){
        vopSearchModel.push({id: this.faq[i].id});
      }
    }
    for (let i=0; i<this.otv.length; i++){
      for (let a=0; a<this.otv[i].otvet.length; a++){
        if (this.otv[i].otvet[a].text.indexOf(this.search)>=0){
          vopSearchModel.push({id: this.otv[i].id});
        }
      }
    }
    for (let i=0; i<vopSearchModel.length; i++){
      if (vopSearchModel[i].id > vopId){
        this.searchModel.push(this.faq[vopSearchModel[i].id-1]);
        vopId = vopSearchModel[i].id;
      }
    }
    for (let i=0; i<this.otv.length; i++){
      this.otv[i].visible = false;      
    }
    for (let i=0; i<this.searchModel.length; i++){
      this.otv[this.searchModel[i].id-1].visible = true;
    }
    this.getotvModel();
  }

  clearsearchVop(){
    for (let i=0; i< this.otv.length; i++){
      this.otv[i].visible = false;
    }
    this.otvModel = [];
    this.searchModel = [];
    for (let i=0; i<this.faq.length; i++){
      this.searchModel.push(this.faq[i]);
    }
  }

  handleClose() {
    if (this.otvModel.length>1){
      this.otv[this.otvModel[this.aindex].id-1].visible = false;
    } else {
      for (let i=0;i<this.otv.length;i++) this.otv[i].visible = false;
    }
    this.getotvModel();
    for (let i=0;i<this.otvModel.length;i++){
      this.otvModel[i].selected=false;
    }
    if (this.otvModel.length>1){
      this.otvModel[0].selected=true;
       this.aindex = 0;
    } 
  }

  tabChenge(e){
    this.aindex = e; 
  }

  panelClick(id){  
    id = id - 1;
    this.otv[id].visible =true;
    this.getotvModel();
    for (let i=0;i<this.otvModel.length;i++){
      this.otvModel[i].selected=false;
    }
    for (let i=0;i<this.otvModel.length;i++){
      if (this.otvModel[i].id==id+1) {
        this.otvModel[i].selected=true;
        // this.aindex = i;
      }
        
    }
  }

  getotvModel(){
    this.otvModel = [];
    for (let i=0; i<this.otv.length;i++){
      if (this.otv[i].visible==true){
        this.otvModel.push(this.otv[i]);
      }
    }
  };

  getMetodika(){
    window.open('/documents/metod');
  };

  faq = [
    {id:1, quest: 'Как рассчитать сумму затрат на перевозку грузов в 1 вагоне по заданному маршруту, если известна себестоимость в тенге/10 т-км?'
    },
    {id:2, quest: 'Как рассчитать себестоимость, если вагон не 4-осный, а многоосный (т.е. имеет более 4 осей)?'
    },
    {id:3, quest: 'Как рассчитать сумму затрат на перевозку 1 контейнера по заданному маршруту, если известна себестоимость в тенге/10 т-км?'
    },
    {id:4, quest: 'Какая методика используется при расчете?'
    },
    {id:5, quest: 'Какие параметры контейнеров используются при расчете?'
    }
  ];

  otv = [
    {id:1, 
           otvet:  [
             {text: 'Для удобства применения алгоритма перехода от себестоимости перевозки грузов в тенге/ 10 т-км к расчету суммы затрат на 1 вагон по заданному маршруту, рассмотрим конкретную ситуацию.'},
             {text: 'Пусть расстояние перевозки составляет 500 км, загрузка вагона 48 тонн, себестоимость перевозку грузов в 1 вагоне равна 22,14 тенге/10 т-км. '},
             {text: 'Дополнительные  расчеты: '},
             {text: '22,14/10*48*500 = 53 136 тенге/вагон'},
             {text: 'Пояснение к расчетам:'},
             {text: '22,14/10 – это себестоимость перевозки 1 тонны груза на 1 км'},
             {text: '22,14/10*48 - это себестоимость перевозки 1 вагона с грузом на 1 км'},
             {text: '22,14/10*48*500 - это себестоимость перевозки 1 вагона с грузом на 500 км'}
           ],
           visible: false,
           selected: false
    },
    {id:2, 
           otvet: [
             {text: 'В случае многоосности вагонов (более 4 осей) необходимо умножить себестоимость на коэффициент осности, который рассчитывается делением фактического количества осей на 4. '},
             {text: 'Для 8 - основного k=1,5'},
             {text: 'Для 12 - основного k=3'},
             {text: 'Для 16 - основного k=4'}
          ],
           visible: false,
           selected: false
    },
    {id:3, 
           otvet: [
             {text: 'Для удобства применения алгоритма перехода от себестоимости перевозки грузов в тенге/10 т-км к расчету суммы затрат на 1 контейнер по заданному маршруту, рассмотрим конкретную ситуацию.'},
             {text: 'Пусть расстояние перевозки составляет 700 км, загрузка контейнера 18 тонн, себестоимость равна 24,32 тенге/10 т-км. '},
             {text: 'Дополнительные  расчеты: '},
             {text: '24,32/10*18*700 = 30 643,2 тенге/контейнер'},
             {text: 'Пояснение к расчетам:'},
             {text: '24,32/10 – это себестоимость перевозки 1 тонны груза на 1 км'},
             {text: '24,32/10*18- это себестоимость перевозки 1 контейнера на 1 км'},
             {text: '24,32/10*18*700 - это себестоимость перевозки 1 контейнера на 700 км'}
          ],
           visible: false,
           selected: false
    },
    {id:4, 
           otvet: [
             {text: 'Ссылка на файл с методикой:'}
          ],
           dopContent: `<a href="/documents/metod">Методика расчета</a>`,
           visible: false,
           selected: false
    },
    {id:5, 
           otvet: [
             {text: 'Параметры контейнеров, используемых при расчете представлены в следующей таблице:'},
             {text: ''},
             {text: ''},
             {text: ''},
             {text: ''} 
          ],
           visible: false,
           selected: false
    }
  ];

  ngOnInit(){
    this.getotvModel();
    this.clearsearchVop();
  }

}