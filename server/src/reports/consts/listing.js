let template = [
  {
    label: 'Период отчета',
    element: 'select',
    field: 'listing_period',
    options: [
      {
        value: 1,
        label: '1 квартал',
      },
      {
        value: 2,
        label: '2 квартал',
      },
      {
        value: 3,
        label: '3 квартал',
      },
      {
        value: 4,
        label: '4 квартал',
      },
      {
        value: 5,
        label: 'Годовой отчет',
      },
    ],
    required: true,
  },
  {
    label: 'Год',
    element: 'select',
    field: 'listing_year',
    options: [
      {
        value: 2023,
        label: '2023 год',
      },
      {
        value: 2022,
        label: '2022 год',
      },
      {
        value: 2021,
        label: '2021 год',
      },
    ],
    required: true,
  },
  {
    element: 'list_group',
    field: 'listing',
    lists: [
      {
        field: 'listing_prospectus',
        element: 'form',
        template: [
          {
            label: 'Наименование Эмитента',
            element: 'input',
            field: 'issuer_data_name',
            required: false,
          },
          {
            label: 'Период раскрытия',
            element: 'input',
            field: 'issuer_data_period',
            required: false,
          },
          {
            label: 'Дата составления',
            element: 'input',
            field: 'issuer_data_date',
            required: false,
          },
          {
            label: '1. Общие сведения об Эмитенте',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            label: '1.1 Юридический и почтовые адреса Эмитента',
            element: 'input',
            field: 'issuer_data_legal_info_address',
            required: false,
          },
          {
            label: '1.2 Контактное лицо Эмитента',
            element: 'input',
            field: 'issuer_data_contact',
            required: false,
          },
          {
            label:
              '1.3 Описание вид деятельности (с указанием номера и даты лицензии) и основного вида выпускаемой продукции или оказываемых услуг',
            element: 'input',
            field: 'issuer_data_description_activity',
            required: false,
          },
          {
            label: '1.4 Аудитор Эмитента',
            element: 'input',
            field: 'issuer_data_auditor',
            required: false,
          },
          {
            label: '1.5 Реестродержатель Эмитента',
            element: 'input',
            field: 'issuer_data_registrar',
            required: false,
          },
          {
            label:
              '1.6 Дата государственной регистрации Эмитента в качестве юридического лица',
            element: 'input',
            field: 'issuer_data_registration',
            required: false,
          },
          {
            label: '1.7 ФИЛИАЛЫ И ПРЕДСТАВИТЕЛЬСТВА ЭМИТЕНТА',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'issuer_branches',
            headers: [
              {
                title: 'Наименование юридического лица',
                span: 5,
              },
              {
                title: 'Организационно-правовая форма',
                span: 5,
              },
              {
                title:
                  'Местонахождение, почтовый адрес, телефон, факс, адрес электронной почты и код ОКПО',
                span: 8,
              },
              {
                title: 'Доля участия в уставном капитале',
                span: 5,
              },
            ],
            lists: [
              {
                field: 'issuer_branches_1',
                span: 5,
              },
              {
                field: 'issuer_branches_2',
                span: 5,
              },
              {
                field: 'issuer_branches_3',
                span: 8,
              },
              {
                field: 'issuer_branches_4',
                span: 5,
              },
            ],
          },
          {
            label:
              '1.8 Общее число сотрудников, работающих в компании по состоянию на конец отчетного периода',
            element: 'input',
            field: 'total_employees',
            required: false,
          },
          {
            label:
              '1.9 СВЕДЕНИЯ ОБ УЧАСТИИ ЭМИТЕНТА В НЕКОММЕРЧЕСКИХ ОРГАНИЗАЦИЯХ',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'issuer_participation',
            headers: [
              {
                title: 'Наименование организации',
                span: 8,
              },
              {
                title: 'Сфера деятельности',
                span: 8,
              },
              {
                title: 'Статус Эмитента в организации',
                span: 8,
              },
            ],
            lists: [
              {
                field: 'issuer_participation_1',
                span: 8,
              },
              {
                field: 'issuer_participation_2',
                span: 8,
              },
              {
                field: 'issuer_participation_3',
                span: 7,
              },
            ],
          },
          {
            label: '2. Корпоративное управление Эмитента.',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            label:
              '2.1. ИНФОРМАЦИЯ ОБ ОБЩИХ СОБРАНИЯХ АКЦИОНЕРОВ, ПРОВЕДЕННЫХ ЭМИТЕНТОМ ЗА ПОСЛЕДНИЙ ГОД (ПОСЛЕДНИМ ГОДОМ СЧИТАЕТСЯ ПЕРИОД С 1-ГО ЧИСЛА АНАЛОГИЧНОГО КВАРТАЛА ПРОШЛОГО КАЛЕНДАРНОГО ГОДА ДО ПОСЛЕДНЕГО ЧИСЛА ОТЧЕТНОГО КВАРТАЛА):',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'meetings_shareholders',
            headers: [
              {
                title: 'Дата проведения',
                span: 12,
              },
              {
                title: 'Повестка дня',
                span: 12,
              },
            ],
            lists: [
              {
                field: 'meetings_shareholders_1',
                span: 12,
              },
              {
                field: 'meetings_shareholders_2',
                span: 11,
              },
            ],
          },
          {
            label:
              '2.2.СВЕДЕНИЯ О НАЧИСЛЕННЫХ ДОХОДАХ НА 1 ЦЕННУЮ БУМАГУ (КАЖДОГО ВИДА) ЗА ПОСЛЕДНИЕ ТРИ ГОДА:',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'information_accrued_income',
            headers: [
              {
                title: 'Вид ЦБ',
                span: 6,
              },
              {
                title: 'Период',
                span: 6,
              },
              {
                title: 'Размер дивиденда или годового купонного дохода',
                span: 12,
              },
              {
                title:
                  'Сведения о наличии задолженности с указанием ее суммы и причины',
                span: 12,
              },
            ],
            lists: [
              {
                field: 'information_accrued_income_1',
                span: 5,
              },
              {
                field: 'information_accrued_income_2',
                span: 5,
              },
              {
                field: 'information_accrued_income_3',
                span: 7,
              },
              {
                field: 'information_accrued_income_4',
                span: 6,
              },
            ],
          },
          {
            label:
              '2.3. АКЦИОНЕРЫ (УЧРЕДИТЕЛИ) ЭМИТЕНТА, ВЛАДЕЮЩИЕ БОЛЕЕ ЧЕМ 5% КАПИТАЛА КОМПАНИИ С УКАЗАНИЕМ ИХ ДОЛИ',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'shareholders_issuer',
            headers: [
              {
                title: 'Наименование акционера (учредителя)',
                span: 8,
              },
              {
                title: 'Страна резидентства',
                span: 5,
              },
              {
                title: 'Доля в капитале Эмитента',
                span: 5,
              },
              {
                title: 'Количество акций (долей)',
                span: 5,
              },
            ],
            lists: [
              {
                field: 'shareholders_issuer_1',
                span: 8,
              },
              {
                field: 'shareholders_issuer_2',
                span: 5,
              },
              {
                field: 'shareholders_issuer_3',
                span: 5,
              },
              {
                field: 'shareholders_issuer_4',
                span: 5,
              },
            ],
          },
          {
            label:
              '2.4. ЛИЦА, ВЛАДЕЮЩИЕ БОЛЕЕ ЧЕМ 5 % ИНЫХ, ЧЕМ АКЦИИ, ЦЕННЫХ БУМАГ, ВЫПУЩЕННЫХ ЭМИТЕНТОМ:',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'persons_holding',
            headers: [
              {
                title: 'Наименование владельца',
                span: 4,
              },
              {
                title:
                  'Вид ценной бумаги (владельцы группируются по ценным бумагам одного вида)',
                span: 7,
              },
              {
                title: 'Страна резидентства',
                span: 4,
              },
              {
                title: 'Доля владения',
                span: 4,
              },
              {
                title: 'Количество ценных бумаг',
                span: 4,
              },
            ],
            lists: [
              {
                field: 'persons_holding_1',
                span: 4,
              },
              {
                field: 'persons_holding_2',
                span: 7,
              },
              {
                field: 'persons_holdings_3',
                span: 4,
              },
              {
                field: 'persons_holding_4',
                span: 4,
              },
              {
                field: 'persons_holding_5',
                span: 4,
              },
            ],
          },
          {
            label:
              '2.5. СТРУКТУРА АКЦИОНЕРОВ ЭМИТЕНТА И ОБЩЕЕ ЧИСЛО АКЦИОНЕРОВ ЭМИТЕНТА ПО СОСТОЯНИЮ НА КОНЕЦ ОТЧЕТНОГО ПЕРИОДА.',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'shareholder_structure_of_issuer',
            headers: [
              {
                title: '',
                span: 8,
              },
              {
                title: 'Количество',
                span: 8,
              },
              {
                title: 'Доля в капитале',
                span: 7,
              },
            ],
            lists: [
              {
                field: 'shareholder_structure_of_issuer_1',
                span: 8,
              },
              {
                field: 'shareholder_structure_of_issuer_2',
                span: 8,
              },
              {
                field: 'shareholder_structure_of_issuer_3',
                span: 7,
              },
            ],
          },
          {
            label:
              '2.6. ПЕРСОНАЛЬНЫЙ СОСТАВ ИСПОЛНИТЕЛЬНОГО, НАБЛЮДАТЕЛЬНОГО И КОНТРОЛЬНОГО ОРГАНОВ ЭМИТЕНТА, С УКАЗАНИЕМ КОЛИЧЕСТВА АКЦИЙ, КОТОРЫМИ ВЛАДЕЕТ КАЖДЫЙ ИЗ НИХ И ДОЛИ В УСТАВНОМ КАПИТАЛЕ ЭМИТЕНТА:',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'personal_composition_of_executive',
            headers: [
              {
                title: 'Ф.И.О.',
                span: 4,
              },
              {
                title:
                  'в органах управления (должностные лица группируются по органам управления)',
                span: 7,
              },
              {
                title: 'Доля в капитале Эмитента',
                span: 4,
              },
              {
                title: 'Количество акций (долей)',
                span: 4,
              },
              {
                title: 'Основное место работы должностного лица Эмитента',
                span: 4,
              },
            ],
            lists: [
              {
                field: 'personal_composition_of_executive_1',
                span: 4,
              },
              {
                field: 'personal_composition_of_executive_2',
                span: 7,
              },
              {
                field: 'personal_composition_of_executive_3',
                span: 4,
              },
              {
                field: 'personal_composition_of_executive_4',
                span: 4,
              },
              {
                field: 'personal_composition_of_executive_5',
                span: 4,
              },
            ],
          },
          {
            label:
              '2.7. СВЕДЕНИЯ О ЗАСЕДАНИЯХ НАБЛЮДАТЕЛЬНОГО СОВЕТА ЭМИТЕНТА ЗА ОТЧЕТНЫЙ КВАРТАЛ:',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'information_sessions_of_supervisory',
            headers: [
              {
                title: 'Дата проведения заседания',
                span: 12,
              },
              {
                title: 'Повестка дня',
                span: 12,
              },
            ],
            lists: [
              {
                field: 'information_sessions_of_supervisory_1',
                span: 12,
              },
              {
                field: 'information_sessions_of_supervisory_2',
                span: 11,
              },
            ],
          },
          {
            label:
              '2.8. СВЕДЕНИЯ ОБ АДМИНИСТРАТИВНЫХ САНКЦИЯХ, КОТОРЫЕ НАЛАГАЛИСЬ НА ЭМИТЕНТА И ЕГО ДОЛЖНОСТНЫХ ЛИЦ ЗА ОТЧЕТНЫЙ КВАРТАЛ:',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'administrative_sanctions',
            headers: [
              {
                title: 'На кого наложена санкция',
                span: 6,
              },
              {
                title: 'Кем наложена санкция',
                span: 6,
              },
              {
                title: 'Основание санкции и ее размер',
                span: 6,
              },
              {
                title: 'Сведения об исполнении',
                span: 5,
              },
            ],
            lists: [
              {
                field: 'administrative_sanctions_1',
                span: 6,
              },
              {
                field: 'administrative_sanctions_2',
                span: 6,
              },
              {
                field: 'administrative_sanctions_3',
                span: 6,
              },
              {
                field: 'administrative_sanctions_4',
                span: 5,
              },
            ],
          },
          {
            label:
              '2.9. СВЕДЕНИЯ О СУЩЕСТВЕННЫХ (ЗАТРАГИВАЮЩИХ СУММЫ РАЗМЕРОМ БОЛЕЕ 5% ОТ БАЛАНСОВОЙ СТОИМОСТИ АКТИВОВ) СУДЕБНЫХ ИСКАХ, ВОЗБУЖДЕННЫХ ЭМИТЕНТОМ ИЛИ НАХОДЯЩИХСЯ В ПРОИЗВОДСТВЕ ПРОТИВ НЕГО, В ИСТЕКШЕМ ОТЧЕТНОМ ПЕРИОДЕ, ЛИБО В ОТНОШЕНИИ СУДЕБНЫХ ИСКОВ К ЕГО ДОЛЖНОСТНЫМ ЛИЦАМ:',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'balance_value_of_assets',
            headers: [
              {
                title:
                  'Истец (если должностное лицо Эмитента, то указать должность)',
                span: 6,
              },
              {
                title:
                  'Ответчик (если должностное лицо Эмитента, то указать должность)',
                span: 6,
              },
              {
                title: 'Предмет разбирательства',
                span: 6,
              },
              {
                title: 'Сведения об имущественном характере исковых требований',
                span: 5,
              },
            ],
            lists: [
              {
                field: 'balance_value_of_assets_1',
                span: 6,
              },
              {
                field: 'balance_value_of_assets_2',
                span: 6,
              },
              {
                field: 'balance_value_of_assets_3',
                span: 6,
              },
              {
                field: 'balance_value_of_assets_4',
                span: 5,
              },
            ],
          },
          {
            label: '3. Сведения о деятельности Эмитента за отчетный период',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            label:
              '3.1. СВЕДЕНИЯ ОБ ОСНОВНЫХ КРЕДИТОРАХ ЭМИТЕНТА ( ДЛЯ ЛЮБЫХ КРЕДИТОРОВ, ДОЛГ В ОТНОШЕНИИ КОТОРЫХ СОСТАВЛЯЕТ БОЛЕЕ 10% ОТ ОБЩЕЙ СУММЫ ОБЯЗАТЕЛЬСТВ ЭМИТЕНТА) ПО СОСТОЯНИЮ НА КОНЕЦ ТЕКУЩЕГО КВАРТАЛА:',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'issuer_creditor',
            headers: [
              {
                title: 'Наименование кредитора',
                span: 8,
              },
              {
                title: 'Характер задолженности',
                span: 8,
              },
              {
                title: 'Доля в общем объеме текущих обязательств',
                span: 7,
              },
            ],
            lists: [
              {
                field: 'issuer_creditor_1',
                span: 8,
              },
              {
                field: 'issuer_creditor_2',
                span: 8,
              },
              {
                field: 'issuer_creditor_3',
                span: 7,
              },
            ],
          },
          {
            label:
              '3.2. СВЕДЕНИЯ ОБ ОСНОВНЫХ КРЕДИТОРАХ ЭМИТЕНТА ПО ТЕКУЩИМ И ДОЛГОСРОЧНЫМ ОБЯЗАТЕЛЬСТВАМ ЭМИТЕНТА ( ПРИ ЭТОМ ДЛЯ ТЕКУЩИХ ОБЯЗАТЕЛЬСТВ УКАЗЫВАЮТСЯ ТЕ КРЕДИТОРЫ , ТЕКУЩАЯ ЗАДОЛЖЕННОСТЬ ЭМИТЕНТА ПЕРЕД КОТОРЫМИ СОСТАВЛЯЕТ БОЛЕЕ 10 % ОТ ОБЩЕГО РАЗМЕРА ТЕКУЩИХ ОБЯЗАТЕЛЬСТВ, А ДЛЯ ДОЛГОСРОЧНЫХ ОБЯЗАТЕЛЬСТВ УКАЗЫВАЮТСЯ ВСЕ КРЕДИТОРЫ):',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'creditors_issuer_current',
            headers: [
              {
                title: 'Наименование кредитора',
                span: 6,
              },
              {
                title:
                  'Характер задолженности (причина возникновения обязательства, а также указание на то, является ли обязательство просроченным или нет)',
                span: 10,
              },
              {
                title: 'Доля в общем объеме текущих обязательств',
                span: 7,
              },
            ],
            lists: [
              {
                field: 'creditors_issuer_current_1',
                span: 6,
              },
              {
                field: 'creditors_issuer_current_2',
                span: 10,
              },
              {
                field: 'creditors_issuer_current_3',
                span: 7,
              },
            ],
          },
          {
            label:
              '3.3. СВЕДЕНИЯ О СДЕЛКАХ ЭМИТЕНТА В ТЕЧЕНИЕ ОТЧЕТНОГО ПЕРИОДА, ЗАТРАГИВАЮЩИХ БОЛЕЕ 20% ИМУЩЕСТВА ЭМИТЕНТА, С ПОЯСНЕНИЕМ ИХ СУЩНОСТИ.',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'issuer_transactions',
            headers: [
              {
                title: 'Дата',
                span: 6,
              },
              {
                title: 'Сущность сделки',
                span: 6,
              },
              {
                title: 'Размер сделки',
                span: 6,
              },
              {
                title: 'Сведения о завершении сделки',
                span: 6,
              },
            ],
            lists: [
              {
                field: 'issuer_transactions_1',
                span: 6,
              },
              {
                field: 'issuer_transactions_2',
                span: 6,
              },
              {
                field: 'issuer_transactions_3',
                span: 6,
              },
              {
                field: 'issuer_transactions_4',
                span: 5,
              },
            ],
          },
          {
            label:
              '3.4. СВЕДЕНИЯ О СОБЛЮДЕНИИ ОБЯЗАТЕЛЬНЫХ НОРМАТИВОВ, УСТАНОВЛЕННЫХ ЗАКОНОДАТЕЛЬСТВОМ (ДЛЯ ЭМИТЕНТОВ, ОСУЩЕСТВЛЯЮЩИХ ЛИЦЕНЗИОННУЮ ДЕЯТЕЛЬНОСТЬ):',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'compliance_mandatory_regulations',
            headers: [
              {
                title: 'Наименование норматива',
                span: 6,
              },
              {
                title: 'Размер норматива',
                span: 6,
              },
              {
                title: 'Значение на начало отчетного квартала',
                span: 6,
              },
              {
                title: 'Значение на конец отчетного квартала',
                span: 6,
              },
            ],
            lists: [
              {
                field: 'compliance_mandatory_regulations_1',
                span: 6,
              },
              {
                field: 'compliance_mandatory_regulations_2',
                span: 6,
              },
              {
                field: 'compliance_mandatory_regulations_3',
                span: 6,
              },
              {
                field: 'compliance_mandatory_regulations_4',
                span: 5,
              },
            ],
          },
        ],
        label: 'Листинговый проспект',
      },
      {
        field: 'attachment_2_1',
        element: 'form',
        template: [
          {
            label:
              'Данные, включаемые в краткий годовой и ежеквартальный отчет для публикации в средствах массовой информации',
            element: 'title',
            type: 'default',
            level: 5,
          },
          {
            label: '1. Данные об эмитенте',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            label: 'Полное и сокращенное наименование эмитента',
            element: 'input',
            field: 'issuer_data_full_name',
            required: false,
          },
          {
            label: 'Организационно-правовая форма',
            element: 'input',
            field: 'issuer_data_org_legal',
            required: false,
          },
          {
            label:
              'Юридический и почтовый адрес эмитента, номер телефона и факс',
            element: 'input',
            field: 'issuer_data_legal_info',
            required: false,
          },
          {
            label: 'Основной вид деятельности эмитента',
            element: 'input',
            field: 'issuer_data_main_activity',
            required: false,
          },
          {
            label:
              '2. Количество владельцев ценных бумаг и работников эмитента',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            label: 'Количество владельцев',
            element: 'input',
            field: 'amount_owners',
            required: false,
          },
          {
            label: 'Количество работников',
            element: 'input',
            field: 'amount_workers',
            required: false,
          },
          {
            label:
              '3. Список юридических лиц, в которых данный эмитент владеет 5 процентами и более уставного капитала',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'list_of_legal_entities',
            headers: [
              {
                title: 'Наименование юридического лица',
                span: 5,
              },
              {
                title: 'Организационно-правовая форма',
                span: 5,
              },
              {
                title:
                  'Местонахождение, почтовый адрес, телефон, факс, адрес электронной почты и код ОКПО',
                span: 8,
              },
              {
                title: 'Доля участия в уставном капитале',
                span: 5,
              },
            ],
            lists: [
              {
                field: 'list_of_legal_entities_1',
                span: 5,
              },
              {
                field: 'list_of_legal_entities_2',
                span: 5,
              },
              {
                field: 'list_of_legal_entities_3',
                span: 8,
              },
              {
                field: 'list_of_legal_entities_4',
                span: 5,
              },
            ],
          },
          {
            label:
              '4. Информация о существенных фактах (далее - факт), затрагивающих деятельность эмитента ценных бумаг в отчетном периоде',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'list',
            dynamic: true,
            required: false,
            field: 'information_about_material_facts',
            headers: [
              {
                title: 'Наименование факта',
                span: 5,
              },
              {
                title: 'Дата появления факта',
                span: 5,
              },
              {
                title: 'Влиянии факта на деятельность',
                span: 8,
              },
              {
                title: 'Дата и форма раскрытия',
                span: 5,
              },
            ],
            lists: [
              {
                field: 'information_about_material_facts_1',
                span: 5,
              },
              {
                field: 'information_about_material_facts_2',
                span: 5,
              },
              {
                field: 'information_about_material_facts_3',
                span: 8,
              },
              {
                field: 'information_about_material_facts_4',
                span: 5,
              },
            ],
          },
          {
            label: '5. Финансовая отчетность эмитента за отчетный период',
            element: 'title',
            type: 'secondary',
            level: 5,
          },
          {
            label: '1) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В БУХГАЛТЕРСКИЙ БАЛАНС',
            element: 'text',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'rows',
            field: 'financial_statements',
            headers: [
              {
                title: 'Код строк',
                span: 2,
              },
              {
                title: '',
                span: 12,
              },
              {
                title: 'На начало отчетного периода',
                span: 5,
              },
              {
                title: 'На конец отчетного периода',
                span: 5,
              },
            ],
            lists: [
              {
                element: 'title',
                value: 'Активы',
                disabled: true,
                field: 'financial_statements_1',
                span: 22,
              },
              {
                element: 'input',
                value: '010',
                disabled: true,
                field: 'financial_statements_2',
                span: 2,
              },
              {
                element: 'input',
                value: '1. Оборотные активы',
                disabled: true,
                field: 'financial_statements_3',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_4',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_5',
                span: 5,
              },
              {
                element: 'input',
                value: '020',
                disabled: true,
                field: 'financial_statements_6',
                span: 2,
              },
              {
                element: 'input',
                value: '2. Внеоборотные активы',
                disabled: true,
                field: 'financial_statements_7',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_8',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_9',
                span: 5,
              },
              {
                element: 'input',
                value: '030',
                disabled: true,
                field: 'financial_statements_10',
                span: 2,
              },
              {
                element: 'input',
                value: '3. Долгосрочная дебиторская задолженность',
                disabled: true,
                field: 'financial_statements_11',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_12',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_13',
                span: 5,
              },
              {
                element: 'input',
                value: '040',
                disabled: true,
                field: 'financial_statements_14',
                span: 2,
              },
              {
                element: 'input',
                value: '4. Краткосрочная дебиторская задолженность',
                disabled: true,
                field: 'financial_statements_15',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_16',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_17',
                span: 5,
              },
              {
                element: 'input',
                value: '050',
                disabled: true,
                field: 'financial_statements_18',
                span: 2,
              },
              {
                element: 'input',
                value: 'Итого активы (010+020+030+040)',
                disabled: true,
                field: 'financial_statements_19',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_20',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_21',
                span: 5,
              },
              {
                element: 'title',
                value: 'Обязательства и капитал',
                disabled: true,
                field: 'financial_statements_22',
                span: 22,
              },
              {
                element: 'input',
                value: '060',
                disabled: true,
                field: 'financial_statements_23',
                span: 2,
              },
              {
                element: 'input',
                value: '1. Краткосрочные обязательства',
                disabled: true,
                field: 'financial_statements_25',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_26',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_27',
                span: 5,
              },
              {
                element: 'input',
                value: '070',
                disabled: true,
                field: 'financial_statements_28',
                span: 2,
              },
              {
                element: 'input',
                value: '2. Долгосрочные обязательства',
                disabled: true,
                field: 'financial_statements_29',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_30',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_31',
                span: 5,
              },
              {
                element: 'input',
                value: '080',
                disabled: true,
                field: 'financial_statements_32',
                span: 2,
              },
              {
                element: 'input',
                value: 'Итого обязательства (060+070)',
                disabled: true,
                field: 'financial_statements_33',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_34',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_35',
                span: 5,
              },
              {
                element: 'input',
                value: '090',
                disabled: true,
                field: 'financial_statements_36',
                span: 2,
              },
              {
                element: 'input',
                value: 'Собственный капитал',
                disabled: true,
                field: '5_1_financial_statements_37',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_38',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_39',
                span: 5,
              },
              {
                element: 'input',
                value: '1. Уставный капитал',
                disabled: true,
                field: 'financial_statements_40',
                span: 12,
                offset: 2,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_41',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_42',
                span: 5,
              },
              {
                element: 'input',
                value: '2. Дополнительный оплаченный капитал',
                disabled: true,
                field: 'financial_statements_43',
                span: 12,
                offset: 2,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_44',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_45',
                span: 5,
              },
              {
                element: 'input',
                value: '3. Нераспределенная прибыль',
                disabled: true,
                field: 'financial_statements_46',
                span: 12,
                offset: 2,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_47',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_48',
                span: 5,
              },
              {
                element: 'input',
                value: '4. Резервный капитал',
                disabled: true,
                field: 'financial_statements_49',
                span: 12,
                offset: 2,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_50',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_51',
                span: 5,
              },
              {
                element: 'input',
                value: '100',
                disabled: true,
                field: 'financial_statements_52',
                span: 2,
              },
              {
                element: 'input',
                value:
                  'Итого обязательства и собственный капитал (060+070+090)',
                disabled: true,
                field: 'financial_statements_53',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_55',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_56',
                span: 5,
              },
            ],
          },
          {
            label: '2) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В ОТЧЕТ О ПРИБЫЛЯХ И УБЫТКАХ',
            element: 'text',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'rows',
            field: 'financial_statements_2',
            headers: [
              {
                title: 'Код строк',
                span: 2,
              },
              {
                title: '',
                span: 12,
              },
              {
                title: 'На начало отчетного периода',
                span: 5,
              },
              {
                title: 'На конец отчетного периода',
                span: 5,
              },
            ],
            lists: [
              {
                element: 'input',
                value: '010',
                disabled: true,
                field: 'financial_statements_2_1',
                span: 2,
              },
              {
                element: 'input',
                value: 'Валовая прибыль',
                disabled: true,
                field: 'financial_statements_2_2',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_3',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_4',
                span: 5,
              },
              {
                element: 'input',
                value: '020',
                disabled: true,
                field: 'financial_statements_2_5',
                span: 2,
              },
              {
                element: 'input',
                value:
                  'Доходы и расходы от прочей операционной деятельности (доходы - расходы)',
                disabled: true,
                field: 'financial_statements_2_6',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_7',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_8',
                span: 5,
              },
              {
                element: 'input',
                value: '030',
                disabled: true,
                field: 'financial_statements_2_9',
                span: 2,
              },
              {
                element: 'input',
                value: 'Операционные расходы',
                disabled: true,
                field: 'financial_statements_2_10',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_11',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_12',
                span: 5,
              },
              {
                element: 'input',
                value: '040',
                disabled: true,
                field: 'financial_statements_2_13',
                span: 2,
              },
              {
                element: 'input',
                value:
                  'Прибыль/убыток от операционной деятельности (010+020-030)',
                disabled: true,
                field: 'financial_statements_2_14',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_15',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_16',
                span: 5,
              },
              {
                element: 'input',
                value: '050',
                disabled: true,
                field: 'financial_statements_2_17',
                span: 2,
              },
              {
                element: 'input',
                value: 'Доходы и расходы от неоперационной деятельности',
                disabled: true,
                field: 'financial_statements_2_18',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_19',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_20',
                span: 5,
              },
              {
                element: 'input',
                value: '060',
                disabled: true,
                field: 'financial_statements_2_21',
                span: 2,
              },
              {
                element: 'input',
                value: 'Прибыль (убыток) до вычета налогов (040+050)',
                disabled: true,
                field: 'financial_statements_2_22',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_23',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_24',
                span: 5,
              },
              {
                element: 'input',
                value: '070',
                disabled: true,
                field: 'financial_statements_2_25',
                span: 2,
              },
              {
                element: 'input',
                value: 'Расходы по налогу на прибыль',
                disabled: true,
                field: 'financial_statements_2_26',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_27',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_28',
                span: 5,
              },
              {
                element: 'input',
                value: '080',
                disabled: true,
                field: 'financial_statements_2_29',
                span: 2,
              },
              {
                element: 'input',
                value: 'Прибыль (убыток) от обычной деятельности (060-070)',
                disabled: true,
                field: 'financial_statements_2_30',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_31',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_32',
                span: 5,
              },
              {
                element: 'input',
                value: '090',
                disabled: true,
                field: 'financial_statements_2_33',
                span: 2,
              },
              {
                element: 'input',
                value: 'Чрезвычайные статьи за минусом налога на прибыль',
                disabled: true,
                field: 'financial_statements_2_34',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_35',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_36',
                span: 5,
              },
              {
                element: 'input',
                value: '100',
                disabled: true,
                field: 'financial_statements_2_37',
                span: 2,
              },
              {
                element: 'input',
                value: 'Чистая прибыль (убыток) отчетного периода (080+090)',
                disabled: true,
                field: 'financial_statements_2_38',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_39',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statements_2_40',
                span: 5,
              },
            ],
          },
          {
            label: '3) СВЕДЕНИЯ, ВКЛЮЧАЕМЫЕ В ОТЧЕТ ОБ ИЗМЕНЕНИЯХ В КАПИТАЛЕ',
            element: 'text',
            type: 'secondary',
            level: 5,
          },
          {
            element: 'rows',
            field: 'financial_statement_3',
            headers: [
              {
                title: 'Код строк',
                span: 2,
              },
              {
                title: '',
                span: 12,
              },
              {
                title: 'На начало отчетного периода',
                span: 5,
              },
              {
                title: 'На конец отчетного периода',
                span: 5,
              },
            ],
            lists: [
              {
                element: 'input',
                value: '010',
                disabled: true,
                field: 'financial_statement_3_1',
                span: 2,
              },
              {
                element: 'input',
                value: 'Сальдо на',
                disabled: false,
                field: 'financial_statement_3_2',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_3',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_4',
                span: 5,
              },
              {
                element: 'input',
                value: '020',
                disabled: true,
                field: 'financial_statement_3_5',
                span: 2,
              },
              {
                element: 'input',
                value:
                  'Изменения в учетной политике и исправление существенных ошибок',
                disabled: true,
                field: 'financial_statement_3_6',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_7',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_8',
                span: 5,
              },
              {
                element: 'input',
                value: '030',
                disabled: true,
                field: 'financial_statement_3_9',
                span: 2,
              },
              {
                element: 'input',
                value: 'Пересчитанное сальдо',
                disabled: true,
                field: 'financial_statement_3_10',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_11',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_12',
                span: 5,
              },
              {
                element: 'input',
                value: '040',
                disabled: true,
                field: 'financial_statement_3_13',
                span: 2,
              },
              {
                element: 'input',
                value:
                  'Чистая прибыль или убытки, не признанные в отчете о прибылях и убытках',
                disabled: true,
                field: 'financial_statement_3_14',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_15',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_16',
                span: 5,
              },
              {
                element: 'input',
                value: '050',
                disabled: true,
                field: 'financial_statement_3_17',
                span: 2,
              },
              {
                element: 'input',
                value: 'Чистая прибыль (убытки) за отчетный период',
                disabled: true,
                field: 'financial_statement_3_18',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_19',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_20',
                span: 5,
              },
              {
                element: 'input',
                value: '060',
                disabled: true,
                field: 'financial_statement_3_21',
                span: 2,
              },
              {
                element: 'input',
                value: 'Дивиденды',
                disabled: true,
                field: 'financial_statement_3_22',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_23',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_24',
                span: 5,
              },
              {
                element: 'input',
                value: '070',
                disabled: true,
                field: 'financial_statement_3_25',
                span: 2,
              },
              {
                element: 'input',
                value: 'Эмиссия акций',
                disabled: true,
                field: 'financial_statement_3_26',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_27',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_28',
                span: 5,
              },
              {
                element: 'input',
                value: '080',
                disabled: true,
                field: 'financial_statement_3_29',
                span: 2,
              },
              {
                element: 'input',
                value: 'Ограничение прибыли к распределению',
                disabled: true,
                field: 'financial_statement_3_30',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_31',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_32',
                span: 5,
              },
              {
                element: 'input',
                value: '090',
                disabled: true,
                field: 'financial_statement_3_33',
                span: 2,
              },
              {
                element: 'input',
                value: 'Изменение уставного капитала',
                disabled: true,
                field: 'financial_statement_3_34',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_35',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_36',
                span: 5,
              },
              {
                element: 'input',
                value: '100',
                disabled: true,
                field: 'financial_statement_3_37',
                span: 2,
              },
              {
                element: 'input',
                value: 'Сальдо на ',
                disabled: false,
                field: 'financial_statement_3_38',
                span: 12,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_39',
                span: 5,
              },
              {
                element: 'input',
                disabled: false,
                field: 'financial_statement_3_40',
                span: 5,
              },
            ],
          },
          {
            label:
              '6. Сведения о направлении средств, привлеченных эмитентом в результате размещения эмиссионных ценных бумаг и ипотечных ценных бумаг, которые включают в себя: общий объем привлеченных средств, сведения о привлеченных средствах, использованных по каждому из направлений, и о направлениях использования привлеченных средств.',
            element: 'textarea',
            field: 'information_on_the_channelling_of_funds',
            required: false,
          },
          {
            label:
              '7. Заемные средства, полученные эмитентом и его дочерними обществами в отчетном периоде. Данный пункт отражает заемные средства, полученные эмитентом в отчетном периоде, и заемные средства, полученные дочерними обществами в отчетном периоде.',
            element: 'textarea',
            field: 'borrowings',
            required: false,
          },
          {
            label:
              '8. Сведения о долгосрочных и краткосрочных финансовых вложениях эмитента за отчетный период.',
            element: 'textarea',
            field: 'information_on_long-term',
            required: false,
          },
          {
            label:
              '9. Доходы по ценным бумагам эмитента. Эта информация представляется при начислении доходов по ценным бумагам эмитента в отчетном периоде или в квартале, предшествующем отчетному кварталу, и включает: вид ценной бумаги, размер доходов, начисленных на одну ценную бумагу,и общую сумму доходов, начисленных по ценным бумагам данного вида.',
            element: 'textarea',
            field: 'income_on_the_issuers_securities',
            required: false,
          },
          {
            label:
              '10. Информация об условиях и характере сделки, совершенной лицами, заинтересованными в совершении обществом сделки, включает: дату совершения сделки, информацию о влиянии сделки на деятельность эмитента (финансовый результат, дополнительные инвестиции и т.д.), информацию об условиях и характере заключенной сделки (предмет, условия, цена сделки и т.д.), степень имеющейся заинтересованности (лица, заинтересованного в сделке), дату опубликования информации о сделке в средствах массовой информации (прилагается копия опубликованного сообщения), а также дату направления уведомления с информацией о сделке в уполномоченный орган по регулированию рынка ценных бумаг.',
            element: 'textarea',
            field: 'information_on_the_terms_and_nature_of_the_transaction',
            required: false,
          },
        ],
        label: 'Приложение 2-1',
      },
      {
        field: 'attachment_1',
        element: 'file',
        label: 'Приложение 1',
      },
      {
        field: 'attachment_2',
        element: 'file',
        label: 'Приложение 2',
      },
      {
        field: 'balance_sheet',
        element: 'file',
        label: 'Бухгалтерский баланс',
      },
      {
        field: 'statement_of_financial_performance',
        element: 'file',
        label: 'Отчет о финансовых результатах',
      },
      {
        field: 'statement_of_cash_flows',
        element: 'file',
        label: 'Отчет о движении денежных средств',
      },
      {
        field: 'statement_of_changes_in_equity',
        element: 'file',
        label: 'Отчет об изменениях в капитале',
      },
      {
        field: 'information_on_compliance_with_economic_norms',
        element: 'file',
        label: 'Сведения о соблюдении экономических нормативов',
      },
      {
        field: 'auditor_report',
        element: 'file',
        label: 'Отчет аудитора',
      },
      {
        field: 'corporate_governance_code',
        element: 'file',
        label: 'Кодекс корпоративного управления',
      },
    ],
  },
];
console.log(JSON.stringify(template));
