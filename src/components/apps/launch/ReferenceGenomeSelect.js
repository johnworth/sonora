/**
 * @author psarando
 *
 * Form fields for selecting Reference Genome/Sequence/Annotation parameters.
 * Can also display as field loading skeletons while selection lists are fetched
 * from the backed services.
 */
import React from "react";
import { useTranslation } from "i18n";

import { useReferenceGenomes } from "../queries";

import { FormFieldLoading, FormTextField } from "@cyverse-de/ui-lib";

import { MenuItem } from "@material-ui/core";

const ReferenceGenomeSelect = ({ param, ...props }) => {
    const [referenceGenomes, setReferenceGenomes] = React.useState([]);

    const { isFetching: referenceGenomesLoading } = useReferenceGenomes(
        true,
        setReferenceGenomes
    );

    const { t } = useTranslation("launch");

    const selectProps = {
        label: param?.label,
        helperText: param?.description,
        required: param?.required,
        ...props,
    };

    if (referenceGenomesLoading) {
        return <FormFieldLoading {...selectProps} />;
    } else if (!referenceGenomes?.length) {
        selectProps.error = true;
        selectProps.helperText = t("errorLoadingReferenceGenomes");
    } else {
        // In the case of relaunch or app integrator default values,
        // the field value object will not be the same instance
        // as the one parsed from the service response.
        selectProps.value =
            referenceGenomes.find(
                (refGenome) => refGenome.id === props.field.value?.id
            ) || "";
    }

    return (
        <FormTextField
            select
            variant="outlined"
            margin="normal"
            {...selectProps}
        >
            {!selectProps.required && <MenuItem value="">&nbsp;</MenuItem>}
            {referenceGenomes.map((refGenome) => (
                <MenuItem key={refGenome.id} value={refGenome}>
                    {refGenome.name}
                </MenuItem>
            ))}
        </FormTextField>
    );
};

export default ReferenceGenomeSelect;
