import { Button, DropdownMenu, Select } from '@radix-ui/themes';
import * as htmlToImage from 'html-to-image';
import { nanoid } from 'nanoid';
import { Language, useFontSize, useLanguage, useSetFontSize, useSetLanuage } from './context';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore

function getFrame() {
  return document.querySelector('.frame') as HTMLElement
}

function SavePNG() {
  const editor = getFrame()
  if (!editor) return
  htmlToImage.toPng(editor as HTMLElement)
  .then(function (dataUrl) {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${nanoid()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
}

function SaveSVG() {
  const editor = getFrame()
  if (!editor) return
  htmlToImage.toSvg(editor as HTMLElement)
  .then(function (dataUrl) {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `${nanoid()}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
}

function CopyImage() {
  const editor = getFrame()
  if (!editor) return

  htmlToImage.toPng(editor as HTMLElement)
  .then(function (dataUrl) {
    const img = new Image()
    img.src = dataUrl
    //img.style.display = 'none'
    document.body.appendChild(img)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    const range = document.createRange()
    range.selectNode(img as HTMLElement)
    sel?.addRange(range)
    document.execCommand(`copy`)
    console.log('Image copied')
    document.body.removeChild(img)
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
 
}

const availableLanguages: Language[] = [
  'javascript',
  'typescript',
  'css',
  'sass',
  'scss',
  'less',
  'python',
  'java',
  'ruby',
  'go',
]

function SelectLanguage() {
  const language = useLanguage()
  const setLanguage = useSetLanuage()
  return (<Select.Root value={language} onValueChange={(e) => setLanguage(e ? e as Language : undefined)}>
  <Select.Trigger placeholder="Select a language" />
  <Select.Content>
    <Select.Item value="">Auto</Select.Item>
    {availableLanguages.map((language) => (
      <Select.Item key={language} value={language}>
        {language}
        </Select.Item>
    ))}
  
  </Select.Content>
</Select.Root>)
}

 function Export() {
  return (<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="soft">
      Export
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item onClick={SavePNG}>Save PNG</DropdownMenu.Item>
    <DropdownMenu.Item onClick={SaveSVG}>Save SVG</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item onClick={CopyImage}>Copy Image</DropdownMenu.Item>
    <DropdownMenu.Item>Copy URL</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>)
}

export function SelectFontSize() {
  const fontSize = useFontSize()
  const setFontSize = useSetFontSize()
  return <Select.Root value={fontSize + ''} onValueChange={(e) => setFontSize(parseInt(e))}>
    <Select.Trigger placeholder="Select a font size" />
    <Select.Content>
      <Select.Item value="12">12</Select.Item>
      <Select.Item value="15">15</Select.Item>
      <Select.Item value="18">18</Select.Item>
      <Select.Item value="20">20</Select.Item>
      </Select.Content>
  </Select.Root>
}

export default function Actions() {

  return <>
  <SelectLanguage />
  <SelectFontSize />
  <Export />
  </>
}