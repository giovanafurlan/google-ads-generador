import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import {
  AiFillEdit
} from 'react-icons/ai';
import { getDescriptions, getTitles } from "../services/getApis";

export default function Home() {

  const [isLoadingT, setIsLoadingT] = useState(false);
  const [isLoadingD, setIsLoadingD] = useState(false);
  const [visibility, setVisibility] = useState('hidden');
  const [display, setDisplay] = useState('inline');
  const [display2, setDisplay2] = useState('none');

  const [company, setCompany] = useState('Webpeak');
  const [audience, setAudience] = useState('Jovens');
  const [resume, setResume] = useState('Melhor Ferramenta de SEO para Aumentar o Tráfego Orgânico do seu site');

  const [title1, setTitle1] = useState();
  const [title2, setTitle2] = useState();
  const [title3, setTitle3] = useState();

  const [description1, setDescription1] = useState();
  const [description2, setDescription2] = useState();

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
          const el = element.text;

          const titles = el?.split('/');

          setTitle1(titles[0]);
          setTitle2(titles[1]);
          setTitle3(titles[2]);
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
          const el = element.text;

          const descriptions = el?.split('/');

          setDescription1(descriptions[0]);
          setDescription2(descriptions[1]);
        })

      })
      .catch((err) => {
        setIsLoadingD(false);
        setVisibility('hidden');
        console.log(err);
      })
      .finally();
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

    setDisplay('none');
    setDisplay2('inline');
  }

  const handleSave = () => {

    setDisplay('inline');
    setDisplay2('none');
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
    }
  ]

  const editFields = [
    {
      id: 'title1',
      title: 'Title 1',
      value: title1 || '',
      onChange: (e) => setTitle1(e.target.value)
    },
    {
      id: 'title2',
      title: 'Title 2',
      value: title2 || '',
      onChange: (e) => setTitle2(e.target.value)
    },
    {
      id: 'title3',
      title: 'Title 3',
      value: title3 || '',
      onChange: (e) => setTitle3(e.target.value)
    },
    {
      id: 'description1',
      title: 'Description 1',
      value: description1 || '',
      onChange: (e) => setDescription1(e.target.value)
    },
    {
      id: 'description2',
      title: 'Description 2',
      value: description2 || '',
      onChange: (e) => setDescription2(e.target.value)
    }
  ]

  const itemsHeadlines = [
    {
      color: title1?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: 'Headline 1:',
      total: title1?.replace(/\s/g, '').length,
      cont: 30
    },
    {
      color: title3?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: 'Headline 2:',
      total: title2?.replace(/\s/g, '').length,
      cont: 30
    },
    {
      color: title3?.replace(/\s/g, '').length > 30 ? 'red' : 'green',
      title: 'Headline 3:',
      total: title3?.replace(/\s/g, '').length,
      cont: 30
    }
  ]

  const itemsDescriptions = [
    {
      color: description1?.replace(/\s/g, '').length > 90 ? 'red' : 'green',
      title: 'Description 1:',
      total: description1?.replace(/\s/g, '').length,
      cont: 90
    },
    {
      color: description2?.replace(/\s/g, '').length > 90 ? 'red' : 'green',
      title: 'Description 2:',
      total: description2?.replace(/\s/g, '').length,
      cont: 90
    }
  ]

  const bg = useColorModeValue('white', 'gray.900');
  const color = useColorModeValue('primary', 'white');

  return (
    <Grid
      templateColumns={{
        lg: 'repeat(3,1fr)'
      }}
      gap='6'
      p='10'>
      <GridItem>
        <form>
          <Flex
            flexDir={'column'}
            gap={'4'}>
            {fields.map((item, idx) => (
              <Field
                key={idx}
                isRequired={item.isRequired}
                id={item.id}
                title={item.title}
                value={item.value}
                onChange={item.onChange} />
            ))}
            <FormControl
              isRequired={true}>
              <FormLabel
                htmlFor={'description'}>
                Company Description
              </FormLabel>
              <Textarea
                id={'description'}
                borderRadius={'30px'}
                rows='6'
                bg={bg}
                value={resume || ''}
                onChange={(e) => setResume(e.target.value)} />
            </FormControl>
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
                  variant='button'
                  mt='8'>
                  Add item
                </Button>
                <Button
                  onClick={handleClear}
                  variant='button-outline'
                  color={color}
                  borderColor={color}
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
                  variant='button'
                  mt='8'>
                  Add item
                </Button>
                <Button
                  onClick={handleClear2}
                  variant='button-outline'
                  color={color}
                  borderColor={color}
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
              w='100%'
              mt='4'
              variant='button-orange'
              onClick={() => { onSubmit() }}>
              Generate
            </Button>
          </Flex>
        </form>
      </GridItem>
      <GridItem
        colSpan={'2'}
        visibility={visibility}>
        <Flex
          flexDir={'column'}
          bg={bg}
          borderRadius={'30px'}
          p='4'
          gap={'4'}
          alignItems={'initial'}>
          {isLoadingT
            ?
            <CircularProgress
              isIndeterminate />
            :
            <Text
              display={display}
              color={'blue.400'}
              fontSize='lg'>
              {title1}/{title2}/{title3}
            </Text>
          }
          {isLoadingD
            ?
            <CircularProgress
              isIndeterminate />
            :
            <Text
              display={display}>
              {description1}/{description2}
            </Text>
          }
          {isLoadingD
            ?
            <CircularProgress
              isIndeterminate />
            :
            <>
              <Flex
                gap='2'
                display={display}>
                {itemsHeadlines.map((item, idx) => (
                  <Item
                    key={idx}
                    color={item.color}
                    title={item.title}
                    total={item.total}
                    cont={item.cont} />
                ))}
              </Flex>
              <Flex
                gap='2'
                display={display}>
                {itemsDescriptions.map((item, idx) => (
                  <Item
                    key={idx}
                    color={item.color}
                    title={item.title}
                    total={item.total}
                    cont={item.cont} />
                ))}
              </Flex>
            </>
          }
          <Box
            w='100%'>
            <Button
              onClick={handleEdit}
              bg='none'
              border='1px'
              float={'right'}
              borderColor={color}
              display={display}
              w='min-content'
              p='0'>
              <Box
                ml='2'>
                <AiFillEdit color={color} />
              </Box>
            </Button>
          </Box>
          <Box
            display={display2}>
            <Flex
              flexDir={'column'}
              gap='4'>
              {editFields.map((item, idx) => (
                <Field
                  key={idx}
                  id={item.id}
                  title={item.title}
                  value={item.value}
                  onChange={item.onChange} />
              ))}
              <Box
                w='100%'>
                <Button
                  onClick={handleSave}
                  float='right'
                  variant='button-orange'
                  w='min-content'>
                  Salvar
                </Button>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
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
  const bg = useColorModeValue('white', 'gray.900');

  return (
    <FormControl
      isRequired={isRequired}>
      <FormLabel
        htmlFor={id}>
        {title}
      </FormLabel>
      <Input
        borderRadius={'30px'}
        bg={bg}
        id={id}
        value={value || ''}
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
      fontSize='16px'
      mr='2'>
      <TagLabel>
        {title}{' '}{total}/{cont}{' '}char
      </TagLabel>
    </Tag>
  )
}