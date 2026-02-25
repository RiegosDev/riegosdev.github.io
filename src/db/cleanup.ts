// src/db/cleanup.ts
import * as dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    '.env',
  ),
});
const prisma = new PrismaClient();

const junkList = [
  '19 year old shy cute teen girl bellinda gaped and fucked hard xxdbx',
  '2 brazilian cuties bruna santos bianca dantas get double anal fucked by very huge cocks dap anal atm atogm monster cock bbc gapes ob361',
  '21 naturals deep and good anal sex for gorgeous sasha s tight ass',
  '3 Girls 1 Guy',
  'A Orgia de Elisa Sanches',
  'Abella danger whitney wright just pussies',
  'Amazing thick black fucked ass rip her pantyhose',
  'Amia Miley',
  'Ava Devine',
  'Bangbros brandi bae can t contain herself and lures her dad s friend over to fuck in the kitchen',
  'Beautifule pro big long master big black cocks emma fantasy tattoos',
  'Bianca bang is naughty girl control',
  'Big booty thai bar girl pounded at home after she took a shower',
  'Big tits chubby blonde fucks bbc interracial',
  'Brazilians marangoni mamae threesome',
  'Brazzers super squirt cake destroyer ny ny lew can t stop getting her ass fucked at the party',
  'Brooke Lee Adams 4k',
  'Bubbly ass babe from germany gets fucked in every position possible kykola charlotta phillip nikola hanzalova 1080p 50fps upscale remaster',
  'Candy In Bikini 1',
  'Chock Shock Lilith Reacts',
  'Colombiana Anal',
  'Creampie Loving Milf',
  'Curly Brunette Takes Huge Dick',
  'Cute Small Tits Brunette Meaty Pussy Rub And Fuck',
  'Danielle Renae Wifey Interracial',
  'Daphne Velma Forest',
  'Deu Pro Branquelo Karen Oliver',
  'Digital playground hunky muscly stallion cums all over the face of lustful agent romi rain',
  'Do They Like Transgender Big Cock Edition',
  'Dois Moleques Sabugando a Tiazina',
  'Dreamer seduction al mencoa francis oxana chic',
  'Evi rei and jordy love try their spanish teacher s huge white cock',
  'Extreme Team8',
  'Female fake taxi thrills with busty newbie video',
  'Fucking inside a tanning bed while smooth jazz',
  'Gabi Timida Fudendo',
  'Geile Liza 10',
  'Gianna Rossi Picked Up Fucked',
  'He Likes Big Butts',
  'Horney Milf Compilation Cum On Tits',
  'Hqcollect 2545 Bambi Black Clum',
  'Indian Wife Fucked By Husband',
  'Is Therian Mishel Morales',
  'Jhjhjhjh Carnival Brazil',
  'Jolla pr gets drilled by jmac s bwc',
  'Joymii petite blonde ivi rein trades her book for hard cock',
  'Katekuray Gets Anal Fucked After Bj',
  'Kathy lee le soy infiel al bastardo de mi marido con mi hijo',
  'Kayla Kayden',
  'Kira fox mypervyfamily 2160',
  'La caliente karmen karma deja que taladren su culo con mucha fuerza',
  'La pompis y el chavalon en trio',
  'Lacey jayne stuffed with bbc',
  'Latina tetas gigantes disfruta una gran polla bbc no name',
  'Lesbian sluts',
  'Lilith grace anal fetish photo shoot',
  'Lily lou anal',
  'Little caprice double penetration moaning dp orgasm',
  'Lorennam92647891',
  'Maabotan ng mama nya feningers sya sopa pinay student now viral',
  'Margo faye creampie cathy gangbang clit',
  'Mjmix97 joyita peruana video1',
  'Monisuea nerdy babe getting her pussy fucked by boyfriend on bed',
  'Namorada novinha do corno sem tarja',
  'Naturistafit sex with rasta',
  'Naughty son fucks sleeping mom',
  'Negra maravilhosa ninfetinha',
  'Nny lv3s hardcore group sex',
  'Once upon a time in palm beach',
  'Paula galvao bunda grande e gostosa',
  'Pegou o tio na punheta e aliviou dando a bunda',
  'Phat ass lady plumber tommy cleans out black pipe',
  'Privacy minyg4bys ex mansao maromba',
  'Putinha',
  'Rastao e bella ruiva',
  'Reality kings richelle ryan is tired of her stepdaughter xxlayna marie shows her who is in charge while tribbing',
  'Reality kings sexy waitress mandy waters sneaks into the bathroom with a customer for a quick fuck',
  'Red heels thai teen anal jessy have her ass a good pounding',
  'Rewarding loyalty by letting stepbro use her',
  'Sexy italian and asian babes have hot threesome',
  'Sexy milf reya lovenlight steps her son be taken advantage of',
  'Sexy redhead skylar snow fucks an old students big cock',
  'Shc 141 arlecchino cosplay genshin impact',
  'Shoplyfter mylf mia james case no 6615441f banging the band',
  'Slm kiana 4k',
  'Sophie rain sophieraiin',
  'Sparks stepson',
  'Stella cox school girl',
  'Them tiddies in pov',
  'Transfixed naughty vendor siri dahl gets spitroasted by horny customers emma rose ariel demure',
  'Us miami nude beach 20 bbc get big tits woman',
  'Vanilla vixen',
  'Vmx rewind',
  'Wife double penetration bbc',
  'Zex 419 yui hatano hibiki otsuki sarina kurokawa yuri oshikawa',
  'A orgia de elisa sanchez',
  'Cock shock lilith reacts',
  'Horny milf cumpilation cum on tits',
  'Hot couple having hardcore romantic sex',
  'Hqcollect 2545 bambi black cum',
  'Is therian mishell morales',
  'Lina henao got milk ask the milf next door ride',
];

async function main() {
  console.log(
    '🧹 Iniciando limpeza de categorias lixo...',
  );

  // Converte a string bizarra pro slug que o Prisma salvou no banco
  const slugsToRemove = junkList.map(
    (name) =>
      name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''),
  );

  try {
    const result =
      await prisma.category.deleteMany({
        where: {
          slug: { in: slugsToRemove },
        },
      });
    console.log(
      `✅ Sucesso! O Anti-seed evaporou ${result.count} categorias bizarras.`,
    );
  } catch (err) {
    console.error(
      '❌ Erro ao limpar banco:',
      err,
    );
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
