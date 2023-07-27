import React from 'react';
import styled from 'styled-components';
import { useDispatch} from 'react-redux';
import { setFilter } from '../redux/store';

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  color: #2ecc71;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #2ecc71;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
`;

const Filter = () => {
  const dispatch = useDispatch();

  const handleChangeFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Label>
      Filter contacts by name:
      <Input type="text" onChange={handleChangeFilter} />
    </Label>
  );
};

export default Filter;
