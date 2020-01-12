import { Injectable } from '@angular/core';
import { IResponse } from './IResponse';


export interface LocaleFile {

  /**
   * File name
   */
  name: string;

  /**
   * File JSON as typescript Object
   */
  data: Object;

}

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private files: LocaleFile[] = [];

  constructor() {

  }

  importFile(file: File) {
    const fr = new FileReader();

    fr.onload = () => {

      this.files.push(
        {
          name: file.name,
          data: JSON.parse(fr.result as string)
        }
      )
    }

    fr.readAsText(file);
  }

  exportFile() {

  }

  getFileByName(fn: String) {
    for (let i = 0; i < this.files.length; i++) {
      const f = this.files[i];

      if (f.name == fn) {
        return f;
      }
    }

    return undefined;
  }

  getFiles() {
    return this.files;
  }
}
