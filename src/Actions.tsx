import { Button, DropdownMenu } from '@radix-ui/themes';
import * as htmlToImage from 'html-to-image';
import { nanoid } from 'nanoid';
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

export default function Actions() {
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