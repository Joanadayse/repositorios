import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;


export const Container= styled.div`
max-width: 700px;
background-color: #fff;
border-radius: 4px;
padding: 30px;
box-shadow:  0 0 20px rgba(0,0,0,0.2);
padding: 30px;
margin: 80px auto;


h1{
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}


svg{
    /* margin-right: 10px; */
}

`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  /* input {
    flex: 1;
    border: 1px solid #ddd;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }

  .error {
    border: red;
  } */
`;

export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 1s linear infinite;
      }
    `}
`;

export const List = styled.ul`

    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        

        & + li{
            border-top:  1px solid #eee;
        }

        a{
            color: #0D2636;
            text-decoration: none;
        }
    }

`

export const DeleteButton = styled.button.attrs({
  type: "button",
})`
  
  background: transparent;
  color: #0d2636;
  border:0;
  padding:8px 7px;
  outline:0;
  border-radius:4px;
`;

const animate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const Input = styled.input`
  flex: 1;
   border: 1px solid ${props => props.error ? "#FF0000" : "#eee"};
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 17px;
`;

export const ErrorBox = styled.div`
  padding: 12px;
  background: #fff4e6;
  border: 2px solid #ff922b;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  animation: fadeIn 0.3s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;