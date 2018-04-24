import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 tc">
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className="center">
                <div className="pa4 br2 shadow-5 form-bg">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button 
                        className="w-30 grow pa2 f4 link ph3 pv dib white bg-purple pointer"
                        onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;