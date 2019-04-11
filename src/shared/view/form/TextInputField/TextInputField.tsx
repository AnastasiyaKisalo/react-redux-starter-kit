import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { GetProps } from '_helpers';

import { TextInput } from 'shared/view/elements';
import { getFieldWithComponent } from 'shared/helpers/react';
import { TranslateFunction } from 'services/i18n';
import { isTranslateObject } from 'shared/types/guards';

type IProps = GetProps<typeof TextInput> & FieldRenderProps & { t: TranslateFunction };

function TextInputField(props: IProps) {
  const { input, meta, t, ...rest } = props;
  const error = typeof rest.error === 'boolean'
    ? rest.error && meta.error
    : meta.touched && meta.error;
  const translatedError = isTranslateObject(error)
    ? t(error.key, error.options)
    : t(error);

  return (
    <TextInput
      {...rest}
      helperText={error && translatedError}
      error={Boolean(error)}
      {...input}
    />
  );
}

export default getFieldWithComponent(TextInputField);
