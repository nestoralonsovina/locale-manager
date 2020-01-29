import { Injectable } from "@angular/core";
import { IResponse } from "./IResponse";
import { ResponseModel } from './view-file/view-file.component';
import { Local } from 'protractor/built/driverProviders';
import { filterNotEmptyNode } from 'ng-zorro-antd';

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

const lsId = 'files';

@Injectable({
    providedIn: "root"
})
export class ManagerService {
    private files: LocaleFile[] = [];
    public currentFile: LocaleFile | undefined = undefined;

    constructor() {

    }

    init() {
        let files: LocaleFile[] = JSON.parse(localStorage.getItem(lsId));

        if (files) {
            this.files = files;
        }

        setInterval(() => {
            console.log("Saving in local storage");
            localStorage.setItem(lsId, JSON.stringify(this.files));
        }, 10000)
    }

    importFile(file: File) {
        const fr = new FileReader();

        fr.onload = () => {
            this.files.push({
                name: file.name,
                data: JSON.parse(fr.result as string)
            });
        };
        fr.readAsText(file);

    }

    exportFile(file: LocaleFile) {
        let dataStr =
            "data:text/json;charset=utf-8," +
            encodeURIComponent(JSON.stringify(file.data));
        let anchor = document.createElement("a");
        anchor.setAttribute("href", dataStr);
        anchor.setAttribute("download", file.name);
        document.body.appendChild(anchor); // required for firefox
        anchor.click();
        anchor.remove();
    }

    addReply(file: LocaleFile, cRes: ResponseModel) {
        file.data[cRes.id].replies.push({
            "text": ""
        });
    }

    addResponse(file: LocaleFile, id: string) {
        file.data[id] = {
            "replies": [
            ],
            "suggestedActions": [],
            "inputHint": "acceptingInput"
        }
    }

    deleteReply(file: LocaleFile, cRes: ResponseModel, id: number) {
        delete (file.data[cRes.id].replies as Array<Object>)[id];
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
