import type { Meta, StoryObj } from '@storybook/react';

import Input from '@/components/Input';
import Button from '@/components/Button';

import Icon from '../Icon';
import Stack from '../Stack';
import ButtonIcon from '../ButtonIcon';

import Form from './Form';
import Control from './Control';
import useForm from './useForm';
import FormControl from './formControl';

const meta: Meta<typeof Form> = {
    title: 'components/Form',
    component: Form,
};

interface IFormTeste {
    tel: string;
    name: string;
    date: string;
    color: string;
    email: string;
    money: string;
    options: string;
    password: string;
    confirmPassword: string;
}

export const Template: StoryObj<typeof Form> = {
    render: () => {
        const [formGroup] = useForm<IFormTeste>({
            form: {
                name: new FormControl({ defaultValue: 'Goku', required: true }),
                email: new FormControl({ defaultValue: 'goku@dragonball.com', required: true, type: 'email' }),
                tel: new FormControl({ defaultValue: '21999999', type: 'tel' }),
                options: new FormControl({ defaultValue: '3' }),
                password: new FormControl({ defaultValue: '', type: 'password', required: true }),
                confirmPassword: new FormControl({ defaultValue: '', type: 'password', required: true }),
                color: new FormControl({ defaultValue: '#1ABC9C', required: true }),
                date: new FormControl({ defaultValue: '2021-10-01' }),
                money: new FormControl({ defaultValue: '1000', type: 'money' }),
            },
            handle: {
                submit(form) {
                    console.info('submit', form.values);
                },
                change(form) {
                    console.info(form);
                }
            },
            validator: {
                password: (form) => {
                    const { password, confirmPassword } = form.values;

                    if (confirmPassword && (confirmPassword !== password)) {
                        return 'Password and confirm password must be the same';
                    }

                    return '';
                }
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control
                    controlName="tel"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        label="tel"
                        maxLength={15}
                        placeholder="tel"
                        value={control.masked}
                        error={control.isInvalid}
                        helperText={control.messageError}
                    />}
                />
                <Control
                    controlName="name"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        label="name"
                        placeholder="name"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                    />}
                />
                <Control
                    controlName="email"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        label="email"
                        placeholder="email"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                    />}
                />
                <Control
                    controlName="password"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        label="password"
                        type="password"
                        placeholder="password"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                        endIcon={
                            <ButtonIcon>
                                <Icon name="eye" />
                            </ButtonIcon>
                        }
                    />}
                />
                <Control
                    controlName="confirmPassword"
                    field={(control) => <Input
                        required
                        fullWidth
                        gutterBottom
                        label="confirmPassword"
                        type="password"
                        placeholder="confirmPassword"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                        endIcon={
                            <ButtonIcon>
                                <Icon name="eye" />
                            </ButtonIcon>
                        }
                    />}
                />
                <Control
                    controlName="confirmPassword"
                    field={(control) => <Input
                        required
                        fullWidth
                        gutterBottom
                        label="confirmPassword"
                        type="password"
                        placeholder="confirmPassword"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                        endIcon={
                            <ButtonIcon>
                                <Icon name="eye" />
                            </ButtonIcon>
                        }
                    />}
                />
                <Control
                    controlName="date"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        label="Date"
                        type="date"
                        placeholder="date"
                        value={control.value}
                        error={control.isInvalid}
                        helperText={control.messageError}
                    />}
                />
                <Control
                    controlName="money"
                    field={(control) => <Input
                        fullWidth
                        gutterBottom
                        label="Money"
                        type="tel"
                        value={control.masked}
                        error={control.isInvalid}
                        required={control.required}
                        helperText={control.messageError}
                    />}
                />

                <Stack flexDirection="row" justifyContent="flex-end">
                    <Button type="submit">Submit</Button>
                </Stack>
            </Form>
        );
    }
};

export default meta;