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
import { getDescriptions, getTitles } from "../services/getApis";

export default function Home() {

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');

  const [company, setCompany] = useState('Webpeak');
  const [audience, setAudience] = useState('Jovens');
  const [resume, setResume] = useState('Melhor Ferramenta de SEO para Aumentar o Tráfego Orgânico do seu site');
  const [resultTitle, setResultTitle] = useState([]);
  const [resultDescription, setResultDescription] = useState([]);

  const [keywords, setKeywords] = useState(['SEO', 'Site']);
  const [id, setId] = useState(1);
  const [name, setName] = useState('');

  const [avoidKeywords, setAvoidKeywords] = useState(['Ruim', 'Péssimo']);
  const [id2, setId2] = useState(1);
  const [name2, setName2] = useState('');

  async function onSubmit() {

    setIsLoadingT(true);
    setIsLoadingD(true);

    setVisibility('visible');

    getTitles(company, resume, audience, keywords, avoidKeywords)
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

    getDescriptions(company, resume, audience, keywords, avoidKeywords)
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

    setCompany('');
    setAudience('');
    setResume('');
    // setKeywords('');
    // setAvoidKeywords('');
  }

  const handleAddClick = (event) => {
    event.preventDefault();
    if (name != '') {
      setId(id => id + 1);
      setKeywords(list => [...list, id + '- ' + name]);
      setName('');
    }

    if (name2 != '') {
      setId2(id => id + 1);
      setAvoidKeywords(list => [...list, id2 + '- ' + name2]);
      setName2('');
    }
  }

  const handleClear = () => {
    setId(0);
    setKeywords([]);
  }

  const handleClear2 = () => {
    setId2(0);
    setAvoidKeywords([]);
  }

  const handleEdit = () => {
    const titles = resultTitle?.split('/');
    const descriptions = resultDescription?.split('/');

    console.log(titles);
    console.log(descriptions);
  }

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
    }
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
        <title>OpenAI</title>
      </Head>
      <Grid
        templateColumns={{
          lg: 'repeat(3,1fr)'
        }}
        gap='4'>
        <GridItem
          p='10'>
          <form>
            <VStack
              spacing={'6'}>
              {/* <Flex
                gap='4'>
                <FormLabel
                  htmlFor='input'>
                  Input Language
                </FormLabel>
                <Select
                  id='input'>
                  <option value=''></option>
                </Select>
                <FormLabel
                  htmlFor='output'>
                  Input Language
                </FormLabel>
                <Select
                  id='output'>
                  <option value=''></option>
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
                w='full'
                flexDir={'column'}>
                <Flex
                  align={'center'}
                  gap='4'>
                  <Field
                    title={'Keywords to Add'}
                    isRequired={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                  <Button
                    onClick={handleAddClick}
                    mt='8'>
                    Add item
                  </Button>
                  <Button
                    onClick={handleClear}
                    mt='8'>
                    Clear list
                  </Button>
                </Flex>
                <div>
                  {keywords.map((item) => {
                    const handleRemoveClick = () => {
                      setKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                      <Flex
                        key={item}
                        justifyContent={'space-between'}
                        align='center'>
                        <Text
                          fontSize={'lg'}
                          mt='2'>
                          {item}
                        </Text>
                        <Button
                          mt='2'
                          onClick={handleRemoveClick}>
                          x
                        </Button>
                      </Flex>
                    );
                  })}
                </div>
              </Flex>
              <Flex
                w='full'
                flexDir={'column'}>
                <Flex
                  align={'center'}
                  gap='4'>
                  <Field
                    title={'Keywords to Avoid'}
                    isRequired={true}
                    value={name2}
                    onChange={(e) => setName2(e.target.value)} />
                  <Button
                    onClick={handleAddClick}
                    mt='8'>
                    Add item
                  </Button>
                  <Button
                    onClick={handleClear2}
                    mt='8'>
                    Clear list
                  </Button>
                </Flex>
                <div>
                  {avoidKeywords.map((item) => {
                    const handleRemoveClick = () => {
                      setAvoidKeywords(list => list.filter((entry) => entry !== item));
                    };
                    return (
                      <Flex
                        key={item}
                        justifyContent={'space-between'}
                        align='center'>
                        <Text
                          fontSize={'lg'}
                          mt='2'>
                          {item}
                        </Text>
                        <Button
                          mt='2'
                          onClick={handleRemoveClick}>
                          x
                        </Button>
                      </Flex>
                    );
                  })}
                </div>
              </Flex>
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
                <Item
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
                <Item
                  key={idx}
                  color={item.color}
                  title={item.title}
                  total={item.total}
                  cont={item.cont} />
              ))}
            </Flex>
            <Button
              onClick={handleEdit}
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

const Field = ({
  isRequired,
  id,
  title,
  value,
  onChange,
  handleKeyDown
}) => {
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
        onChange={onChange}
        onKeyDown={handleKeyDown} />
    </FormControl>
  )
}

const Item = ({
  color,
  title,
  total,
  cont }) => {
  return (
    <Tag
      colorScheme={color}
      fontSize='16px'>
      <TagLabel>
        {title}{' '}{total}/{cont}{' '}char
      </TagLabel>
    </Tag>
  )
}