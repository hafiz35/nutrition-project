import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MenuComponent } from './menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { SearchComponent } from '../search/search.component';


describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule,RouterTestingModule],
        declarations: [ MenuComponent,SearchComponent ],
        providers:[AuthService,HttpClient
        ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(MenuComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('getfoods', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(()=>{
            fixture.detectChanges();
            expect(component.foods.length).toBe(150)
        })
        
  }));
   
});
