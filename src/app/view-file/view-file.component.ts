import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ManagerService, LocaleFile } from "../manager.service";
import * as _ from "lodash";

interface Reply {
    text: string;
}

class ResponseModel {
    constructor(
        public id: string,
        public replies: Array<Reply>,
        public suggestedActions: [],
        public inputHint: string
    ) {}
}

@Component({
    selector: "app-view-file",
    templateUrl: "./view-file.component.html",
    styleUrls: ["./view-file.component.less"]
})
export class ViewFileComponent implements OnInit {
    currentFile: LocaleFile;
    fileData: ResponseModel[];
    currentResponse: ResponseModel | undefined = undefined;

    constructor(
        private route: ActivatedRoute,
        private managerService: ManagerService
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const file = this.managerService.getFileByName(params.get("name"));
            const responseId = params.get("responseId");

            if (!file) {
                this.currentFile = {
                    name: "The file doesn't exist",
                    data: {}
                };
            } else {
                this.currentFile = file;
                let responseIndex = -1;
                let index = 0;

                this.fileData = Object.getOwnPropertyNames(file.data).map(
                    (key: string) => {
                        index += 1;

                        if (responseId && responseId == key) {
                            responseIndex = index;
                        }

                        return new ResponseModel(
                            key,
                            file.data[key].replies,
                            file.data[key].suggestedActions,
                            file.data[key].inputHint
                        );
                    }
                );

                if (responseIndex !== -1) {
                    this.currentResponse = this.fileData[responseIndex - 1];
                }
            }
        });
    }
}
