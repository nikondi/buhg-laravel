<?php

namespace App\Http\Controllers;

use App\Enums\EducationType;
use App\Helpers\ExcelSheet;
use App\Models\RequestModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xls;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use SimpleXMLElement;

class RequestExportController extends Controller
{
    public function xml(RequestModel $request, Request $_request)
    {
        $request->load(['director', 'organization']);
        $doc_type = $_request->get('doc_type', 'passport');

        $filename = sprintf("UT_SPROPLOBUCH_%s_%s_%s%s_%s_",
            config('request_xml.kod_one'),
            config('request_xml.kod_two'),
            $request->organization->inn,
            $request->organization->kpp,
            date('Ymd')
        );

        $id_file = $filename.$request->uuid;
        $name_document_xml = $filename.substr($request->uuid, 0, 13) . '.xml';

        $current_date_document = date('d.m.Y'); //дата формирования документа

        $payer = [
            'surname' => mb_strtoupper($request->surname),
            'name' => mb_strtoupper($request->name),
            'lastname' => mb_strtoupper($request->lastname),
            'birthdate' => $request->birthdate->format('d.m.Y'),
            'doc_date' => $request->doc_date->format('d.m.Y'),
            'doc_type' => $request->doc_type,
            'doc_number' => $request->doc_number,
            'inn' => $request->inn,
        ];


        // Создаем корневой элемент
        $xml = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8"?><Файл />');

        // Установка атрибутов корневого элемента
//        $xml->addAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        $xml->addAttribute('ИдФайл', $id_file); //название без .xml
        $xml->addAttribute('ВерсПрог', '1С:БУХГАЛТЕРИЯ ГОС. УЧРЕЖДЕНИЯ 2.0.101.6');
        $xml->addAttribute('ВерсФорм', '5.01');

        // Создаем элемент Документ
        $document = $xml->addChild('Документ');
        $document->addAttribute('КНД', '1151158');
        $document->addAttribute('ДатаДок', $current_date_document);
//        $document->addAttribute('КодНО', '001'); //неизвестно
        $document->addAttribute('ОтчГод', $request->report_year);

        // Создаем элемент СвНп
        $svNp = $document->addChild('СвНП');
        $npYUL = $svNp->addChild('НПЮЛ');
        $npYUL->addAttribute('НаимОрг', htmlspecialchars($request->organization->name));
        $npYUL->addAttribute('ИННЮЛ', $request->organization->inn);
        $npYUL->addAttribute('КПП', $request->organization->kpp);

        // Создаем элемент Подписант
        $podpisant = $document->addChild('Подписант');
//        $podpisant->addAttribute('ПрПодп', $request->director->type->value);

        $fio = $podpisant->addChild('ФИО');
//        $fiO_type = $fiO->addChild('ФИОТип');
        $fio->addAttribute('Фамилия', mb_strtoupper($request->director->surname));
        $fio->addAttribute('Имя', mb_strtoupper($request->director->name));
        $fio->addAttribute('Отчество', mb_strtoupper($request->director->lastname));

        // Создаем элемент СвПред
//        $svPred = $podpisant->addChild('СвПред');
//        $svPred->addAttribute('НаимДок', $request->director->document);

        // Создаем элемент СведОплОбрУсл
        $svedOp = $document->addChild('СпрОплОбрУсл');
        $svedOp->addAttribute('НомерСправ', ltrim($request->number, '0'));
        $svedOp->addAttribute('НомКорр', $request->changes_count);
        $svedOp->addAttribute('ПрФормОбуч', $request->education_type == EducationType::FULL_TIME?'1':'0');
        $svedOp->addAttribute('ПрОбуч', $request->same_student ? '1' : '0');
        $svedOp->addAttribute('СуммаРасх', $request->contract_cost);

        // Создаем элемент НППлатОбрУсл
        $npPlatOp = $svedOp->addChild('НППлатОбрУсл');
        $npPlatOp->addAttribute('ДатаРожд', $payer['birthdate']);
//        $danFIO = $npPlatOp->addChild('ДанФИОТип');
        if($doc_type == 'inn')
            $npPlatOp->addAttribute('ИНН', $payer['inn']);

        // Создаем элементы ФИО и СвДок
        $fiOPlat = $npPlatOp->addChild('ФИО');
        $fiOPlat->addAttribute('Фамилия', $payer['surname']);
        $fiOPlat->addAttribute('Имя', $payer['name']);
        $fiOPlat->addAttribute('Отчество', $payer['lastname']);

        // Сведения о документе
        if($doc_type == 'passport') {
            $svedDok = $npPlatOp->addChild('СведДок');
            $svedDok->addAttribute('КодВидДок', $payer['doc_type']);
            $svedDok->addAttribute('СерНомДок', $payer['doc_number']);
            $svedDok->addAttribute('ДатаДок', $payer['doc_date']);
        }

        if (!$request->same_student) {
            $student = [
                'surname' => mb_strtoupper($request->student_surname),
                'name' => mb_strtoupper($request->student_name),
                'lastname' => mb_strtoupper($request->student_lastname),
                'birthdate' => $request->student_birthdate->format('d.m.Y'),
                'doc_date' => $request->student_doc_date->format('d.m.Y'),
                'doc_type' => $request->student_doc_type,
                'doc_number' => $request->student_doc_number,
                'inn' => $request->student_inn,
            ];

            // Создаем элемент Обучаемый
            $obuchayemy = $svedOp->addChild('Обучаемый');
            $obuchayemy->addAttribute('ДатаРожд', $student['birthdate']);
            if($doc_type == 'inn')
                $obuchayemy->addAttribute('ИНН', $student['inn']);

            // Создаем элементы ФИО и СвДок для обучаемого
            $fiOObuch = $obuchayemy->addChild('ФИО');
            $fiOObuch->addAttribute('Фамилия', $student['surname']);
            $fiOObuch->addAttribute('Имя', $student['name']);
            $fiOObuch->addAttribute('Отчество', $student['lastname']);

            if($doc_type == 'passport') {
                $svedDokObuch = $obuchayemy->addChild('СведДок');
                $svedDokObuch->addAttribute('КодВидДок', $student['doc_type']);
                $svedDokObuch->addAttribute('СерНомДок', $student['doc_number']);
                $svedDokObuch->addAttribute('ДатаДок', $student['doc_date']);
            }
        }

        // Сохранение XML в файл
        // Завершение: сохраняем XML как строку
        $resultXML = $xml->asXML();
        $resultXML = str_replace('<?xml version="1.0" encoding="utf-8"?>', '<?xml version="1.0" encoding="windows-1251"?>', $resultXML);
        $resultXML = iconv('utf-8', 'windows-1251//TRANSLIT', $resultXML);

        return response($resultXML, 200)
            ->setCharset('windows-1251')
            ->header('Content-Type', 'text/xml')
            ->header('Content-Disposition', 'attachment; filename="' . $name_document_xml . '"');
    }

    public function excel(RequestModel $request)
    {
        $request->load(['director', 'organization']);

        $sourceFilePath = Storage::disk('local')->path('request_template.xlsx');

        // МЕНЯЮ ФОРМИРОВАНИЕ НАЗВАНИЯ
        $name_excel = sprintf('%s_%s_%s_%s.xlsx',
            $request->surname,
            $request->name,
            $request->number,
            $request->report_year,
        );

        $spreadsheet = IOFactory::load($sourceFilePath);
        $sheet1 = ExcelSheet::from($spreadsheet->getSheetByName('Лист_1'));
        $sheet2 = ExcelSheet::from($spreadsheet->getSheetByName('Лист_2'));

        if (!$sheet1 || !$sheet2) {
            return back()
                ->withErrors([
                    'export' => 'Ошибка при формировании Excel'
                ]);
        }

        $organization_data = [
            'inn' => mb_str_pad($request->organization->inn, 12, '-'),
            'kpp' => mb_str_pad($request->organization->kpp, 9, '-'),
            'name' => mb_str_pad(mb_strtoupper($request->organization->name), 160, '-'),
        ];

        $exploded_contract_cost = explode(".", $request->contract_cost);
        $contract_cost = sprintf('%s%s',
            mb_str_pad($exploded_contract_cost[0], 13, '-'),
            isset($exploded_contract_cost[1])?mb_str_pad($exploded_contract_cost[1], 2, '0'):'00'
        );
        $request_data = [
            'number' => mb_str_pad($request->number ?? $request->id, 12, '0', STR_PAD_LEFT),
            'corrections' => mb_str_pad($request->changes_count, 3, '-'),
            'report_year' => mb_str_pad($request->report_year, 4, '-'),
            'contract_cost' => $contract_cost,
        ];

        $payer = [
            'surname' => mb_str_pad(mb_strtoupper($request->surname), 36, '-'),
            'name' => mb_str_pad(mb_strtoupper($request->name), 36, '-'),
            'lastname' => mb_str_pad(mb_strtoupper($request->lastname), 36, '-'),
            'inn' => mb_str_pad($request->inn, 12, '-'),
            'birthdate' => mb_str_pad($request->birthdate->format('dmY'), 10, '-'),
            'doc_type' => mb_str_pad($request->doc_type, 2, '-'),
            'doc_number' => mb_str_pad($request->doc_number, 20, '-'),
            'doc_date' => mb_str_pad($request->doc_date->format('dmY'), 10, '-'),
        ];

        $director = [
            'surname' => mb_str_pad(mb_strtoupper($request->director->surname), 20, '-'),
            'name' => mb_str_pad(mb_strtoupper($request->director->name), 20, '-'),
            'lastname' => mb_str_pad(mb_strtoupper($request->director->lastname), 20, '-'),
        ];

        //inn_organization
        $sheet1->mappedFill($organization_data['inn'], ['AC2', 'AE2', 'AH2', 'AJ2', 'AL2', 'AN2', 'AQ2', 'AT2', 'AW2', 'AX2', 'AZ2', 'BA2']);
        $sheet2->mappedFill($organization_data['inn'], ['Q3', 'R3', 'S3', 'U3', 'V3', 'W3', 'Y3', 'Z3', 'AB3', 'AE3', 'AG3', 'AH3']);

        //kpp_organization
        $sheet1->mappedFill($organization_data['kpp'], ['AC8', 'AE8', 'AH8', 'AJ8', 'AL8', 'AN8', 'AQ8', 'AT8', 'AW8']);
        $sheet2->mappedFill($organization_data['kpp'], ['Q6', 'R6', 'S6', 'U6', 'V6', 'W6', 'Y6', 'Z6', 'AB6']);

        $sheet1
            //number_referense
            ->mappedFill($request_data['number'], ['N19', 'P19', 'Q19', 'T19', 'V19', 'W19', 'Y19', 'AA19', 'AC19', 'AE19', 'AH19', 'AJ19'])
            //number_correction
            ->mappedFill($request_data['corrections'], ['BD19', 'BE19', 'BF19'])
            //reporting_year
            ->mappedFill($request_data['report_year'], ['BP19', 'BQ19', 'BR19', 'BS19'])
            //edu_org
            ->mappedFill($organization_data['name'], ['B23', 'E23', 'H23', 'K23', 'L23', 'N23', 'P23', 'Q23', 'T23', 'V23', 'W23', 'Y23', 'AA23', 'AC23', 'AE23',
                'AH23', 'AJ23', 'AL23', 'AN23', 'AQ23', 'AT23', 'AW23', 'AX23', 'AZ23', 'BA23', 'BC23', 'BD23', 'BE23', 'BF23',
                'BH23', 'BI23', 'BK23', 'BL23', 'BM23', 'BN23', 'BO23', 'BP23', 'BQ23', 'BR23', 'BS23', 'B25', 'E25', 'H25',
                'K25', 'L25', 'N25', 'P25', 'Q25', 'T25', 'V25', 'W25', 'Y25', 'AA25', 'AC25', 'AE25', 'AH25', 'AJ25', 'AL25',
                'AN25', 'AQ25', 'AT25', 'AW25', 'AX25', 'AZ25', 'BA25', 'BC25', 'BD25', 'BE25', 'BF25', 'BH25', 'BI25', 'BK25',
                'BL25', 'BM25', 'BN25', 'BO25', 'BP25', 'BQ25', 'BR25', 'BS25', 'B27', 'E27', 'H27', 'K27', 'L27', 'N27', 'P27',
                'Q27', 'T27', 'V27', 'W27', 'Y27', 'AA27', 'AC27', 'AE27', 'AH27', 'AJ27', 'AL27', 'AN27', 'AQ27', 'AT27', 'AW27',
                'AX27', 'AZ27', 'BA27', 'BC27', 'BD27', 'BE27', 'BF27', 'BH27', 'BI27', 'BK27', 'BL27', 'BM27', 'BN27', 'BO27',
                'BP27', 'BQ27', 'BR27', 'BS27', 'B29', 'E29', 'H29', 'K29', 'L29', 'N29', 'P29', 'Q29', 'T29', 'V29', 'W29',
                'Y29', 'AA29', 'AC29', 'AE29', 'AH29', 'AJ29', 'AL29', 'AN29', 'AQ29', 'AT29', 'AW29', 'AX29', 'AZ29', 'BA29',
                'BC29', 'BD29', 'BE29', 'BF29', 'BH29', 'BI29', 'BK29', 'BL29', 'BM29', 'BN29', 'BO29', 'BP29', 'BQ29', 'BR29', 'BS29'
            ])
            //form_edu
            ->setCellValue('AJ35', $request->education_type == EducationType::FULL_TIME?'1':'0')
            //family_reference
            ->mappedFill($payer['surname'], ['L41', 'N41', 'P41', 'Q41', 'T41', 'V41', 'W41', 'Y41', 'AA41', 'AC41', 'AE41', 'AH41', 'AJ41', 'AL41', 'AN41', 'AQ41', 'AT41', 'AW41', 'AX41', 'AZ41', 'BA41', 'BC41', 'BD41', 'BE41', 'BF41', 'BH41', 'BI41', 'BK41', 'BL41', 'BM41', 'BN41', 'BO41', 'BP41', 'BQ41', 'BR41', 'BS41'])
            //name_reference
            ->mappedFill($payer['name'], ['L43', 'N43', 'P43', 'Q43', 'T43', 'V43', 'W43', 'Y43', 'AA43', 'AC43', 'AE43', 'AH43', 'AJ43', 'AL43', 'AN43', 'AQ43', 'AT43', 'AW43', 'AX43', 'AZ43', 'BA43', 'BC43', 'BD43', 'BE43', 'BF43', 'BH43', 'BI43', 'BK43', 'BL43', 'BM43', 'BN43', 'BO43', 'BP43', 'BQ43', 'BR43', 'BS43'])
            //patronymic_pl
            ->mappedFill($payer['lastname'], ['L45', 'N45', 'P45', 'Q45', 'T45', 'V45', 'W45', 'Y45', 'AA45', 'AC45', 'AE45', 'AH45', 'AJ45', 'AL45', 'AN45', 'AQ45', 'AT45', 'AW45', 'AX45', 'AZ45', 'BA45', 'BC45', 'BD45', 'BE45', 'BF45', 'BH45', 'BI45', 'BK45', 'BL45', 'BM45', 'BN45', 'BO45', 'BP45', 'BQ45', 'BR45', 'BS45'])
            //inn_pl
            ->mappedFill($payer['inn'], ['L47', 'N47', 'P47', 'Q47', 'T47', 'V47', 'W47', 'Y47', 'AA47', 'AC47', 'AE47', 'AH47'])
            //date_r_pl
            ->mappedFill($payer['birthdate'], ['BC47', 'BD47', 'BF47', 'BH47', 'BK47', 'BL47', 'BM47', 'BN47'])
            //code_doc
            ->mappedFill($payer['doc_type'], ['Q51', 'T51'])
            //serial_pl
            ->mappedFill($payer['doc_number'], ['AT51', 'AW51', 'AX51', 'AZ51', 'BA51', 'BC51', 'BD51', 'BE51', 'BF51', 'BH51', 'BI51', 'BK51', 'BL51', 'BM51', 'BN51', 'BO51', 'BP51', 'BQ51', 'BR51', 'BS51'])
            //date_doc_pl
            ->mappedFill($payer['doc_date'], ['Q53', 'T53', 'W53', 'Y53', 'AC53', 'AE53', 'AH53', 'AJ53'])
            //status_pl
            ->setCellValue('AN55', $request->same_student?'1':'0')
            //summa_referense
            ->mappedFill($request_data['contract_cost'], ['AN59', 'AQ59', 'AT59', 'AW59', 'AX59', 'AZ59', 'BA59', 'BC59', 'BD59', 'BE59', 'BF59', 'BH59', 'BI59', 'BL59', 'BM59'])
            //family_director
            ->mappedFill($director['surname'], ['B68', 'E68', 'H68', 'K68', 'L68', 'N68', 'P68', 'Q68', 'T68', 'V68', 'W68', 'Y68', 'AA68', 'AC68', 'AE68', 'AH68', 'AJ68', 'AL68', 'AN68', 'AQ68'])
            //name_director
            ->mappedFill($director['name'], ['B70', 'E70', 'H70', 'K70', 'L70', 'N70', 'P70', 'Q70', 'T70', 'V70', 'W70', 'Y70', 'AA70', 'AC70', 'AE70', 'AH70', 'AJ70', 'AL70', 'AN70', 'AQ70'])
            //patronymic_director
            ->mappedFill($director['lastname'], ['B72', 'E72', 'H72', 'K72', 'L72', 'N72', 'P72', 'Q72', 'T72', 'V72', 'W72', 'Y72', 'AA72', 'AC72', 'AE72', 'AH72', 'AJ72', 'AL72', 'AN72', 'AQ72'])
        ;



        if(!$request->same_student) {
            $student = [
                'surname' => mb_str_pad(mb_strtoupper($request->student_surname), 36, '-'),
                'name' => mb_str_pad(mb_strtoupper($request->student_name), 36, '-'),
                'lastname' => mb_str_pad(mb_strtoupper($request->student_lastname), 36, '-'),
                'inn' => mb_str_pad($request->student_inn, 12, '-'),
                'birthdate' => mb_str_pad($request->student_birthdate->format('dmY'), 10, '-'),
                'doc_type' => mb_str_pad($request->student_doc_type, 2, '-'),
                'doc_number' => mb_str_pad($request->student_doc_number, 20, '-'),
                'doc_date' => mb_str_pad($request->student_doc_date->format('dmY'), 10, '-'),
            ];

            $sheet2
                //family_st
                ->mappedFill($student['surname'], ['H13', 'I13', 'J13', 'K13', 'M13', 'N13', 'O13', 'P13', 'Q13', 'R13', 'S13', 'U13', 'V13', 'W13', 'Y13', 'Z13', 'AB13', 'AE13', 'AG13', 'AH13', 'AI13', 'AJ13', 'AK13', 'AL13', 'AM13', 'AN13', 'AO13', 'AP13', 'AR13', 'AS13', 'AT13', 'AU13', 'AV13', 'AW13', 'AX13', 'AY13'])
                //name_st
                ->mappedFill($student['name'], ['H15', 'I15', 'J15', 'K15', 'M15', 'N15', 'O15', 'P15', 'Q15', 'R15', 'S15', 'U15', 'V15', 'W15', 'Y15', 'Z15', 'AB15', 'AE15', 'AG15', 'AH15', 'AI15', 'AJ15', 'AK15', 'AL15', 'AM15', 'AN15', 'AO15', 'AP15', 'AR15', 'AS15', 'AT15', 'AU15', 'AV15', 'AW15', 'AX15', 'AY15'])
                //patronymic_st
                ->mappedFill($student['lastname'], ['H17', 'I17', 'J17', 'K17', 'M17', 'N17', 'O17', 'P17', 'Q17', 'R17', 'S17', 'U17', 'V17', 'W17', 'Y17', 'Z17', 'AB17', 'AE17', 'AG17', 'AH17', 'AI17', 'AJ17', 'AK17', 'AL17', 'AM17', 'AN17', 'AO17', 'AP17', 'AR17', 'AS17', 'AT17', 'AU17', 'AV17', 'AW17', 'AX17', 'AY17'])
                //inn_st
                ->mappedFill($student['inn'], ['H19', 'I19', 'J19', 'K19', 'M19', 'N19', 'O19', 'P19', 'Q19', 'R19', 'S19', 'U19'])
                //date_r_pl
                ->mappedFill($student['birthdate'], ['AJ19', 'AK19', 'AM19', 'AN19', 'AP19', 'AR19', 'AS19', 'AT19'])
                //code_doc
                ->mappedFill($student['doc_type'], ['K23', 'M23'])
                //serial_pl
                ->mappedFill($student['doc_number'], ['AB23', 'AE23', 'AG23', 'AH23', 'AI23', 'AJ23', 'AK23', 'AL23', 'AM23', 'AN23', 'AO23', 'AP23', 'AR23', 'AS23', 'AT23', 'AU23', 'AV23', 'AW23', 'AX23', 'AY23'])
                //date_doc_pl
                ->mappedFill($student['doc_date'], ['K25', 'M25', 'O25', 'P25', 'R25', 'S25', 'U25', 'V25'])
            ;
        }

        // Сохраняем изменения в том же файле
        ob_start();
        (new Xlsx($spreadsheet))->save("php://output");
        $xlsContent = ob_get_clean();

        return response($xlsContent, 200)
            ->header('Content-Type', 'application/vnd.ms-excel;')
            ->header('Content-Disposition', 'attachment; filename="'.$name_excel.'"');
    }
}
