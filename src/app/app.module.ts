import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { effectsArr } from './store/effects';

//Services
import { HeroService } from './services/hero.service';
import { SEOService } from './services/seo.service';

//Enviroment
import { environment } from '../environments/environment';

//Components
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroEditComponent } from './components/hero-edit/hero-edit.component';

//Routes
import { AppRoutingModule } from './app-routing.module';

//Pipes.
import { HeightConversionPipe} from './pipes/heightConversion.pipe';
import { IdConversionPipe } from './pipes/idConversion.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroEditComponent,
    HeightConversionPipe,
    IdConversionPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    TransferHttpCacheModule,
    HttpClientModule,
    NgtUniversalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot( effectsArr ),
    AppRoutingModule
  ],
  providers: [HeroService, SEOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
