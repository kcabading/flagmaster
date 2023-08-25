import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

  export enum AlertDialogTypes {
    CONFIRM,
    INFORMATION,
    WARNING,
    DANGER
  }

  export type TAlertDialog = {
    type: AlertDialogTypes,
    show: boolean,
    text: string,
    confirmTitle?: string,
    confirmText?: string,
    cancelText?: string,
    confirmHandler?: () => void,
    cancelHandler: () => void
  }

  const CommonAlertDialog = ({ type, show, text, confirmTitle, confirmText, cancelText,confirmHandler, cancelHandler }: TAlertDialog) => {
    return (
      <AlertDialog open={show}>
          <AlertDialogContent>
              <AlertDialogHeader>
              {type === AlertDialogTypes.CONFIRM && <AlertDialogTitle>{confirmTitle}</AlertDialogTitle> }
              <AlertDialogDescription>
                  {text}
              </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                { type === AlertDialogTypes.CONFIRM && <AlertDialogCancel>{confirmText}</AlertDialogCancel> }
                <AlertDialogAction onClick={cancelHandler}>{cancelText}</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    )
  }

  export default CommonAlertDialog