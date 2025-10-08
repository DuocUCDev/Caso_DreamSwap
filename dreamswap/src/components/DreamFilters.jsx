import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button } from 'react-bootstrap';
import { CustomCheckbox } from './ui/CustomCheckbox';
import { categories, intensityLevels, FilterTypes } from '../constants/filterOptions';

const DreamFilters = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        [FilterTypes.CATEGORIES]: new Set(),
        [FilterTypes.DURATION]: '',
        [FilterTypes.INTENSITY]: ''
    });

    const handleCategoryChange = (category) => {
        const newCategories = new Set(filters[FilterTypes.CATEGORIES]);
        newCategories.has(category) 
            ? newCategories.delete(category) 
            : newCategories.add(category);
        
        updateFilters(FilterTypes.CATEGORIES, newCategories);
    };

    const updateFilters = (field, value) => {
        const newFilters = {
            ...filters,
            [field]: value
        };
        
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <Card className="filter-card">
            <Card.Body className="p-4">
                <h2 className="fs-2 fw-bold mb-4 text-light">Filtros</h2>

                <div className="mb-4">
                    <h3 className="fs-4 mb-3 text-light">Categorías</h3>
                    {categories.map((category) => (
                        <CustomCheckbox
                            key={category}
                            id={`category-${category}`}
                            label={category}
                            checked={filters[FilterTypes.CATEGORIES].has(category)}
                            onChange={() => handleCategoryChange(category)}
                        />
                    ))}
                </div>

                <div className="mb-4">
                    <h3 className="fs-4 mb-3 text-light">Duración</h3>
                    <Form.Label className="mb-2 text-light">Minutos</Form.Label>
                    <Form.Control
                        type="number"
                        value={filters[FilterTypes.DURATION]}
                        onChange={(e) => updateFilters(FilterTypes.DURATION, e.target.value)}
                        className="custom-input"
                        placeholder="30"
                    />
                </div>

                <div className="mb-4">
                    <h3 className="fs-4 mb-3 text-light">Intensidad emocional</h3>
                    <Form.Label className="mb-2 text-light">Nivel</Form.Label>
                    <Form.Select
                        value={filters[FilterTypes.INTENSITY]}
                        onChange={(e) => updateFilters(FilterTypes.INTENSITY, e.target.value)}
                        className="custom-select"
                    >
                        {intensityLevels.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </Form.Select>
                </div>

                <Button 
                    className="w-100 gradient-button py-3"
                    onClick={() => onFilterChange(filters)}
                >
                    Aplicar filtros
                </Button>
            </Card.Body>
        </Card>
    );
};

DreamFilters.propTypes = {
    onFilterChange: PropTypes.func.isRequired
};

export default DreamFilters;