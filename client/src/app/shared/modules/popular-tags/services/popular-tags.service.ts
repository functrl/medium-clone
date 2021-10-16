import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from '../../../../../environments/environment'
import {map} from 'rxjs/operators'
import {GetPopularTagsResponseInterface} from '../types/get-popular-tags-response.interface'
import {PopularTagType} from '../../../types/popular-tag.type'

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags'

    return this.http
      .get(url)
      .pipe(map((response: GetPopularTagsResponseInterface) => response.tags))
  }
}
