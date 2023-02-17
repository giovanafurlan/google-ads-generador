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
  ListItem,
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
import { v4 as uuidv4 } from "uuid";
import { getDescriptions, getTitles } from "../services/getApis";

export default function Home() {

  const initialList = [
    {
      id: "a",
      name: "Robin"
    },
    {
      id: "b",
      name: "Dennis"
    }
  ];

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [company, setCompany] = useState('Webpeak');
  const [audience, setAudience] = useState('Jovens');
  const [resume, setResume] = useState('Melhor Ferramenta de SEO para Aumentar o Tráfego Orgânico do seu site');
  const [resultTitle, setResultTitle] = useState();
  const [resultDescription, setResultDescription] = useState();

  async function onSubmit() {

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    getTitles(company, resume, audience)
      .then((res) => {
        // console.log(res);

        setIsLoadingT(false);

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          setResultTitle(element.text);
        })

      })
      .catch((err) => {
        setIsLoadingT(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();

    getDescriptions(company, resume, audience)
      .then((res) => {
        // console.log(res);

        setIsLoadingD(false);

        const data = res;

        console.log(data);

        data.choices.forEach(element => {
          setResultDescription(element.text);
        })

      })
      .catch((err) => {
        setIsLoadingD(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
  }

  const [list, setList] = useState(initialList);
  const [name, setname] = useState("");

  const handleChange = (event) => {
    setname(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // const newList = list.concat({ name, id: uuidv4() });
      // setList(newList);
      // setname("");
      handleAdd();
    }
  }

  const handleAdd = () => {
    const newList = list.concat({ name, id: uuidv4() });
    setList(newList);
    setname("");
  }

  const deleteItem = (id) => () => {
   
      setList(todos => todos.filter((item) => item.id !== id));
    
  };

  const fields = [
    {
      isRequired: true,
      id: 'company',
      title: 'Company Name',
      value: company,
      onChange: (e) => setCompany(e.target.value)
    },
    {
      isRequired: true,
      id: 'audience',
      title: 'Audience',
      value: audience,
      onChange: (e) => setAudience(e.target.value)
    },
    {
      isRequired: true,
      id: 'description',
      title: 'Company Description',
      value: resume,
      onChange: (e) => setResume(e.target.value)
    },
    // {
    //   isRequired: true,
    //   id: 'keywords',
    //   title: 'Product Keywords',
    //   value: name,
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
          <form>
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
              <Flex
                align={'center'}
                gap='8'>
                <Field
                  title={'Keywords to Add'}
                  isRequired={true}
                  value={name}
                  onChange={handleChange}
                  onAdd={handleAdd}
                  handleKeyDown={handleKeyDown} />
                <Button
                  type="button"
                  onClick={handleAdd}
                  mt='8'>
                  Add
                </Button>
              </Flex>
              <List
                list={list}
                handleDelete={deleteItem(list.id)} />
              <Button
                value='Generate'
                onClick={() => { onSubmit() }}>
                Generate
              </Button>
            </VStack>
          </form>
        </GridItem>
        <GridItem
          colSpan={'2'}>
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
            {isLoadingT
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Text
                color={'blue.400'}
                fontSize='lg'>
                {resultTitle}
              </Text>
            }
            {isLoadingD
              ?
              <CircularProgress
                isIndeterminate />
              :
              <Text>
                {resultDescription}
              </Text>
            }
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
          </VStack>
        </GridItem>
      </Grid>
    </div>
  )
}

const Field = ({ isRequired, id, title, value, onChange, handleKeyDown }) => {
  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Flex
        gap='2'>
        <Input
          id={id}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown} />
      </Flex>
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

const List = ({ list, handleDelete }) => {
  return (
    <Flex
      flexWrap={'wrap'}
      gap='4'>
      {list.map((item) => {
        return <Text key={item.id}>{item.name} <span onClick={handleDelete} style={{ color: 'red', cursor: 'pointer' }}>X</span></Text>;
      })}
    </Flex>
  );
};