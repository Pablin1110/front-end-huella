import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScopetwoPage } from './scopetwo.page';

describe('ScopetwoPage', () => {
  let component: ScopetwoPage;
  let fixture: ComponentFixture<ScopetwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopetwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScopetwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
