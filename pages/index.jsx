import { useState } from "react";
import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Tag,
  TagLabel,
  Text,
  VStack
} from "@chakra-ui/react";
import {
  AiFillEdit
} from 'react-icons/ai';
import Head from "next/head";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [companyInput, setCompanyInput] = useState("");
  const [audienceInput, setAudienceInput] = useState("");
  const [resumeInput, setResumeInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {

    event.preventDefault();

    setIsLoading(true);

    try {
      const responseTitle = await fetch("/api/generateTitle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company: companyInput, audience: audienceInput, resume: resumeInput }),
      });

      const data = await responseTitle.json();

      if (responseTitle.status !== 200) {
        throw data.error || new Error(`Request failed with status ${responseTitle.status}`);
      }

      console.log(data.result);

      // setCompanyInput('');
      // setAudienceInput('');
      // setResumeInput('');

    } catch (error) {
      setIsLoading(false);

      console.error(error);
      alert(error.message);
    }
  }

  const fields = [
    {
      isRequired: true,
      id: 'company',
      title: 'Company Name',
      value: companyInput,
      onChange: (e) => setCompanyInput(e.target.value)
    },
    {
      isRequired: true,
      id: 'audience',
      title: 'Audience',
      value: audienceInput,
      onChange: (e) => setAudienceInput(e.target.value)
    },
    {
      isRequired: true,
      id: 'description',
      title: 'Company Description',
      value: resumeInput,
      onChange: (e) => setResumeInput(e.target.value)
    },
    // {
    //   isRequired: true,
    //   id: 'keywords',
    //   title: 'Product Keywords',
    //   value: '',
    //   onChange: ''
    // },
    // {
    //   isRequired: true,
    //   id: 'avoid',
    //   title: 'Keywords to Avoid',
    //   value: '',
    //   onChange: ''
    // }
  ]

  const notesHeadline = [
    {
      color: 'blue',
      title: 'Readability:',
      total: '',
      cont: ''
    },
    {
      color: '',
      title: 'Headline 1:',
      total: '',
      cont: ''
    },
    {
      color: '',
      title: 'Headline 2:',
      total: '',
      cont: ''
    },
    {
      color: '',
      title: 'Headline 3:',
      total: '',
      cont: ''
    }
  ]

  const notesDescripton = [
    {
      color: '',
      title: 'Description 1:',
      total: '',
      cont: ''
    },
    {
      color: '',
      title: 'Description 2:',
      total: '',
      cont: ''
    }
  ]

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>
      <Grid
        templateColumns={'repeat(3,1fr)'}
        gap='4'>
        <GridItem
          p='10'>
          <form
            onSubmit={onSubmit}>
            <VStack
              spacing={'10'}>
              {/* <Flex
              gap='4'>
              <FormLabel
                htmlFor='input'>
                Input Language
              </FormLabel>
              <Select
                id='input'>
                <option value=""></option>
              </Select>
              <FormLabel
                htmlFor='output'>
                Input Language
              </FormLabel>
              <Select
                id='output'>
                <option value=""></option>
              </Select>
            </Flex> */}
              {fields.map((item, idx) => (
                <Field
                  key={idx}
                  isRequired={item.isRequired}
                  id={item.id}
                  title={item.title}
                  value={item.value}
                  onChange={item.onChange} />
              ))}
              <Button
                type='submit'
                value='Generate'
                disabled={isLoading}>
                Generate
              </Button>
            </VStack>
          </form>
        </GridItem>
        <GridItem
          colSpan={'2'}>
          {isLoading
            ?
            <CircularProgress
              isIndeterminate />
            :
            <VStack
              visibility={visibility}
              border={'1px'}
              borderColor='gray.700'
              bg='gray.700'
              borderRadius={'lg'}
              m='12'
              p='4'
              spacing={'4'}
              alignItems={'initial'}>
              <Text
                color={'blue'}
                fontSize='lg'>
                {result}
              </Text>
              <Text>

              </Text>
              <Flex
                gap='2'>
                {notesHeadline.map((item, idx) => (
                  <Note
                    key={idx}
                    color={item.color}
                    title={item.title}
                    total={item.total}
                    cont={item.cont} />
                ))}
              </Flex>
              <Flex
                gap='2'>
                {notesDescripton.map((item, idx) => (
                  <Note
                    key={idx}
                    color={item.color}
                    title={item.title}
                    total={item.total}
                    cont={item.cont} />
                ))}
              </Flex>
              <Button
                w='min-content'
                p='0'>
                <AiFillEdit color='black' />
              </Button>
            </VStack>}
        </GridItem>
      </Grid>
    </div>
  )
}

const Field = ({ isRequired, id, title, value, onChange }) => {
  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Input
        id={id}
        value={value}
        onChange={onChange} />
    </FormControl>
  )
}

const Note = ({ color, title, total, cont }) => {
  return (
    <Tag
      colorScheme={color}>
      <TagLabel>
        {title}{' '}{total}/{cont}{' '}char
      </TagLabel>
    </Tag>
  )
}