import { inject, Injectable, Type } from '@angular/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class JobsGlobalDialogService {
  private readonly _dialogService = inject(DialogService);
  private _dialogRefStack: DynamicDialogRef<any>[] = [];

  open<T>(
    component: Type<T>,
    config: DynamicDialogConfig<any>,
  ): DynamicDialogRef<T> {
    console.log('open dialog');

    const dialogRef = this._dialogService.open(component, {
      ...config,
      dismissableMask: true,
    });
    this._dialogRefStack.push(dialogRef);
    const sub = dialogRef.onClose.subscribe(() => {
      sub.unsubscribe();
      this.closeLastDialog();
    });
    return dialogRef;
  }
  closeLastDialog(data?: any) {
    const dialogRef = this._dialogRefStack.pop();
    console.log(dialogRef);

    dialogRef?.close(data);
  }
  closeAllDialogs() {
    this._dialogRefStack.forEach((dialogRef) => dialogRef.close());
    this._dialogRefStack = [];
  }
}
