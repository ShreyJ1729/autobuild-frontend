import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Editable,
    EditableInput,
    EditablePreview,
    EditableTextarea,
    Flex,
    FormLabel,
    HStack,
    IconButton,
    Input,
    List,
    ListItem,
    Spinner,
    Text,
    Textarea,
    useEditableControls,
} from "@chakra-ui/react";
import { FaPencilAlt } from "react-icons/fa";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface KeyFeaturesQuestionProps {
    keyFeatures: string[];
    setKeyFeatures: (newKeyFeatures: string[]) => void;
    handleDescriptionSubmit: () => void;
    handleFeaturesSubmit: () => void;
    setStepNumber: (newStepNumber: number) => void;
    loading2: boolean;
}

// TODO build option to "lock" a feature so that it doesn't get deleted on regeneration

const KeyFeaturesQuestion = ({ keyFeatures, setKeyFeatures, handleDescriptionSubmit, handleFeaturesSubmit, setStepNumber, loading2 }: KeyFeaturesQuestionProps) => {
    const handleRegenerateClick = () => {
        console.log("Regenerating key features...")
        handleDescriptionSubmit();
    };

    const handleFeatureChange = (index: number, newFeature: string) => {
        // Update the feature at the specified index in the state array
        const newKeyFeatures = [...keyFeatures];
        newKeyFeatures[index] = newFeature;
        setKeyFeatures(newKeyFeatures);
    };

    const deleteKeyFeature = (index: number) => {
        console.log("Deleting feature " + index)
        const newKeyFeatures = [...keyFeatures];
        newKeyFeatures.splice(index, 1);
        alert("Deleted feature " + index)
        setKeyFeatures(newKeyFeatures);
    }

    return (
        <Box>
            <FormLabel fontSize="lg" fontWeight="semi-bold">
                Key Product Features (click to edit):
            </FormLabel>
            <List spacing={3}>
                {keyFeatures.map((feature, index) => (
                    <ListItem key={index} my={4}>
                        <HStack>
                            <Text fontSize="lg">{index + 1}.</Text>
                            <Editable
                                my={2}
                                value={feature}
                                onChange={(value) => handleFeatureChange(index, value)}>
                                <HStack>
                                    <EditableControls index={index} deleteKeyFeature={deleteKeyFeature} />
                                    <EditablePreview px={3} py={2} borderWidth={1} />
                                    <EditableInput minW="3xl" />
                                </HStack>
                            </Editable>
                        </HStack>
                    </ListItem>
                ))}
            </List>
            <Button mt={3} mr={1} p={4} onClick={handleRegenerateClick}>
                Regenerate Features
            </Button>
            <Button colorScheme="green" mt={3} ml={1} p={4} onClick={handleFeaturesSubmit}>
                {loading2 ? <Spinner /> : <>Send for Code-Gen</>}
            </Button>
        </Box >
    );
}

export default KeyFeaturesQuestion;

interface EditableControlsProps {
    index: number;
    deleteKeyFeature: (index: number) => void;
}

const EditableControls = ({ index, deleteKeyFeature }: EditableControlsProps) => {
    const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm' mr={2}>
            {/* <IconButton aria-label="delete-feature" icon={<DeleteIcon />} colorScheme="red" onClick={() => { console.log }} /> */}
            <IconButton aria-label="confirm-edits" icon={<CheckIcon />} {...getSubmitButtonProps()} />
            <IconButton aria-label="cancel-edits" icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
    ) : (<></>
        // <Flex justifyContent='center'>
        //     <IconButton aria-label="edit" size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        // </Flex>
    )
}