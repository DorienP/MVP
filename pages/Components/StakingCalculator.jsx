import react, {useState} from 'react';

export default function StakingCalculator() {

    const [annual, setAnnual] = useState('');

    const equate = (amount) => {
        const annual = amount * .05;
        setAnnual(annual);
    }

    return (
        <div className="card">
            <div className="card=header">
                Hello
           </div>
            <div className="card-body">
                <div className="card-text">
                    This is a <strong>simplified</strong> staking calculator, How many ada would you like to stake?
               </div>
                {/* add a onKeyPress here for form to calculate the total */}
                <form >
                    <div className="form-group" onChange={() => { equate(inputStakingAmount.value) }}>
                        <label>Amount</label>
                        <i className="tim-icons icon-coins"></i>
                        <input type="text" id="inputStakingAmount" />
                        <div className=""></div>
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Period</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}