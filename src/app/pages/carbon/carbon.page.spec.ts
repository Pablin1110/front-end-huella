import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarbonPage } from './carbon.page';

describe('CarbonPage', () => {
  let component: CarbonPage;
  let fixture: ComponentFixture<CarbonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarbonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarbonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
