/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: '/graphql'}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: APOLLO_OPTIONS, useFactory: createApollo, deps: [HttpLink]},
  ],
})
export class AppModule {}
