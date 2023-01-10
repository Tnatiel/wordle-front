import { InputBox } from './InputBox';

export function InputRow({inputsIds, inputsRefs}: {inputsIds: string[], inputsRefs: {[key: string]: React.RefObject<HTMLInputElement>}}) {

    // todo move box logic in custom hook to row 

    return (
        <div className="input-row">
            
            {inputsIds.map( id => (
                <InputBox
                    boxId={id}
                    key={id}
                    boxRef={inputsRefs[id]}
                    inputsRefs={inputsRefs}

                />
            )
        
            )}
        </div>
    )
}

