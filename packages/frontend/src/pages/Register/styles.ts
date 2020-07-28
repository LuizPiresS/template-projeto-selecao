import styled from 'styled-components'
import { shade } from 'polished'

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`
export const FormCSS = styled.form`
  margin-top: 40px;
  max-width: 700px;

  /* display: flex; */

  input {
    display: block;
    margin-top: 10px;
    height: 50px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px;
    color: #a3a3a3;

    &:placeholder {
      color: #a8a8b3;
    }
  }

  button {
    display: block;
    margin-top: 10px;
    width: 210px;
    height: 50px;
    background: #04d361;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`
