import { Component, ElementRef, ViewChild } from '@angular/core';
import { ManagerService, LocaleFile } from './manager.service';
import { filterNotEmptyNode } from 'ng-zorro-antd';
import { ViewFileComponent } from './view-file/view-file.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    @ViewChild('uploadInput', {static: true}) 
    public uploadInput: ElementRef;

    private viewFileComponent: ViewFileComponent;

    private uploadInputHTML: HTMLInputElement;
    public currentFiles: LocaleFile[] = [];

    isCollapsed = false;

    constructor(
        public managerService: ManagerService,
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.uploadInputHTML = this.uploadInput.nativeElement
    }

    uploadClick() {
        this.uploadInput.nativeElement.click();
    }

    onInputFile() {
        const files = this.uploadInputHTML.files;

        for (const key in files) {
            if (files.hasOwnProperty(key)) {
                const file = files[key];

                this.managerService.importFile(file);
            }
        }

        this.currentFiles = this.managerService.getFiles();
    }
}
