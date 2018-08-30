import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Apollo } from 'apollo-angular';
import { BatchRecordMutation, BatchRecordQuery } from '../../graphql/BatchRecord';
import { ConstituentMutation, ConstituentQuery } from '../../graphql/Constituent';

@Injectable({
  providedIn: 'root',
})
export class BatchRecordService {


  constructor(private http: Http, private apollo: Apollo) {}


  private userURL = '../../../assets/json/batch-record.json';
  getBatchRecords(): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: BatchRecordQuery.getBatchRecords,
    })
    .valueChanges;
  }

  getConstituents(ids): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: ConstituentQuery.getConstituents,
      variables: {
        input: ids,
      },
    }).valueChanges;
  }

  createBatchRecords(BatchRecords: any): void {

    this.apollo.mutate({
      mutation: ConstituentMutation.addConstituents,
      variables: {input: {constituents: BatchRecords.newConstituents}},
    }).subscribe((response1) => {
      const newIds = response1.data.addConstituents.map((cons) => cons.id);
      const payload = {
        constituents: newIds,
        properties: [],
        productionTimestamp: new Date(),
        batchBestTimestamp: new Date(),
      };

      // TODO: constituents need to filer the ids in.
      // We can do this from response1.data.addConstituents for new ones
      // and payload.constituents[].ids
      Object.keys(BatchRecords).forEach((key) => {
        if (BatchRecords[key] === '' || key === 'newConstituents') {
          return;
        }
        if (key === 'constituents') {
          payload.constituents = payload.constituents.concat(BatchRecords[key].map((cons) => cons.id));
        } else {
          payload[key] = BatchRecords[key];
        }
      });
      // TODO: handle dates correctly.
      payload.productionTimestamp = new Date();
      payload.batchBestTimestamp = new Date();
      console.log(payload);


      this.apollo.mutate({
        mutation: BatchRecordMutation.createBatchRecord,
        variables: {
          input: payload,
        },
      }).subscribe((response2) => {
        console.log('done');
        console.log(response2);
        return response2;
      }, (error) => {
        console.log('error');
        console.log(error);
        return error;
      });

    }, (error) => {
      console.log('error sending const');
      console.log(error);
      return error;
    });
  }

  editBatchRecords(BatchRecords: any): Observable<any> {
    // console.log(BatchRecords)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(BatchRecords);

    return this.http.post(this.userURL, body, options).map((res: Response) => {
      // console.log(res)
    });
  }
}
