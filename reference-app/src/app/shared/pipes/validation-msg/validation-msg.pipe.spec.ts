import { ValidationMsgPipe } from './validation-msg.pipe'

describe(ValidationMsgPipe.name, () => {
  it('should return correct validation message', () => {
    const pipe = new ValidationMsgPipe()

    expect(pipe.transform('Email', 'required')).toEqual('Email is required')
    expect(pipe.transform('Email', 'invalid')).toEqual('Email is invalid')
    expect(pipe.transform('Age', 'number')).toEqual('Age should be a number')
    expect(pipe.transform('Password', 'equalTo', 'Confirm Password')).toEqual('Password and Confirm Password is mismatched')
    expect(pipe.transform('Age', 'min', 1)).toEqual('Age should not be smaller than 1')
    expect(pipe.transform('Age', 'max', 99)).toEqual('Age should not be greater than 99')
    expect(pipe.transform('Name', 'minlength', 32)).toEqual('Name should not be shorter than 32 characters')
    expect(pipe.transform('Name', 'maxlength', 32)).toEqual('Name should not be longer than 32 characters')
    expect(pipe.transform('Name', 'length', 32)).toEqual('Name should have 32 characters')
    expect(pipe.transform('Name', 'alphanumeric')).toEqual('Name should only contain alphanumeric characters')
    expect(pipe.transform('Email')).toEqual('')
  })
})
