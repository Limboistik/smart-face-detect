import React from 'react';

const Rank = ({name, entries}) => { 
    return (
        <div className="tc">
            <div className="white f4">
              {`${name} , your entry count is...`}
            </div>
            <div className="white f2 ma2">
              {entries}
            </div>
        </div>
    )
}

export default Rank;