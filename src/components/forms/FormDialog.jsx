import React, {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput'

const FormDialog = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const inputName =useCallback((event) =>{
        setName(event.target.value)
    },[setName])

    const inputEmail = useCallback((event) =>{
        setEmail(event.target.value)
    },[setEmail])

    const inputDescription = useCallback( (event) =>{
        setDescription(event.target.value)
    },[setDescription]);

    const validateRequiredInput = (...args) =>{
        let isBlank = false;
        for (let i =0; i < args.length; i++){
            if(args[i] === ""){
                isBlank = true
            }
        }
        return isBlank;
    };

    const submitForm = () =>{
        const isBlank = validateRequiredInput(name, email, description)

        if(isBlank){
            alert('必須項目が入力されていません。')
            return false
        } else {
            const payload = {
                text: 'お問い合わせがありました\n' +
                    'お名前：' + name + '\n' +
                    'email：' + email + '\n' +
                    '問い合わせ内容\n' +
                    description 
            }

            const url = 'https://hooks.slack.com/services/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'

            fetch(url,{
                method: "POST",
                body: JSON.stringify(payload),
            }).then(() => {
                alert('送信が完了しました。')
                setName("");
                setEmail("");
                setDescription("");

                props.handleClose()
            });
        }
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">お問い合わせフォーム</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <TextInput
                        label={'お名前(必須)'} multiline={false} rows={1}
                        value={name} type={'text'} onChange={inputName}
                    />
                                            <TextInput
                        label={'e-mailアドレス(必須)'} multiline={false} rows={1}
                        value={email} type={'e-mail'} onChange={inputEmail}
                    />
                    <TextInput
                        label={'お問い合わせ内容(必須)'} multiline={true} rows={5}
                        value={description} type={'text'} onChange={inputDescription}
                    />
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={submitForm} color="primary" autoFocus>
                    送信する
                </Button>
            </DialogActions>
        </Dialog>
    );
    
}

export default FormDialog