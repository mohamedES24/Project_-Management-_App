import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const modal = forwardRef(function Modal({children,btnCap},ref){
    const dialog = useRef()
    useImperativeHandle(ref,()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
        
    })
    return createPortal(
        <dialog ref={dialog}>
            {children}
            <form method="dialog">
                <button>{btnCap}</button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    );
})

export default modal;