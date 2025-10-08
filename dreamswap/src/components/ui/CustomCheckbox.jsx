import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export const CustomCheckbox = ({ id, label, checked, onChange }) => (
    <div className="custom-checkbox mb-2">
        <Form.Check
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            label={
                <span className="d-flex align-items-center gap-2 text-light">
                    <span className="custom-checkbox-box">
                        {checked && <span className="custom-checkbox-icon" />}
                    </span>
                    {label}
                </span>
            }
        />
    </div>
);

CustomCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};