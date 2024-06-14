import React from 'react'
import styles from './dialogueBox.module.css'

const DialogueBox = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.actions}>
                    <button onClick={onConfirm} className={styles.yes}>Confirm</button>
                    <button onClick={onCancel} className={styles.no}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DialogueBox