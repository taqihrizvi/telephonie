// Created for temporary purposes because sip server is not working

interface IPropType {
  id: number;
  img: string;
  name: string;
  number: string;
  cta: string;
}
interface IPropTypeAccounts {
  id: number;
  name: string;
  online?: string;
  Avatar?: string;
  number: string;
}

export const DummyContact: IPropType[] = [
  {
    id: 1,
    img: 'Assests/Rectangle.svg',
    name: 'Abdul Samad',
    number: '00923155131510',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 2,
    img: 'Assests/Rectangle.svg',
    name: 'Samad Ullah',
    number: '00923155131510',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 3,
    img: 'Assests/Rectangle.svg',
    name: 'Asif Iqbal',
    number: '00923453111120',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 4,
    img: 'Assests/Rectangle.svg',
    name: 'Sigbhat Ullah',
    number: '009231259159808',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 5,
    img: 'Assests/Rectangle.svg',
    name: 'Usman Rahim',
    number: '00923485586156',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 6,
    img: 'Assests/Rectangle.svg',
    name: 'Ayesha Munir',
    number: '00923028796088',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 7,
    img: 'Assests/Rectangle.svg',
    name: 'Gbon Ashluxe',
    number: '(+92) 45-45-4554-54',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 8,
    img: 'Assests/Rectangle.svg',
    name: 'Hbon Ashluxe',
    number: '(+92) 45-45-4554-54',
    cta: 'Assests/PhoneCall.svg',
  },
  {
    id: 9,
    img: 'Assests/Rectangle.svg',
    name: 'Ibon Ashluxe',
    number: '(+92) 45-45-4554-54',
    cta: 'Assests/PhoneCall.svg',
  },
];

export const DummyAccounts: IPropTypeAccounts[] = [
  {
    id: 1,
    name: 'Abon Ashluxe',
    online: 'Assests/onlineBadge.svg',
    Avatar: 'Assests/Avatar.svg',
    number: '(+92) 45-45-4554-54',
  },
  {
    id: 2,
    name: 'Bbon Ashluxe',
    Avatar: 'Assests/Avatar.svg',
    number: '(+92) 45-45-4554-54',
  },
  {
    id: 3,
    name: 'Cbon Ashluxe',
    Avatar: 'Assests/Avatar.svg',
    number: '(+92) 45-45-4554-54',
  },
];
