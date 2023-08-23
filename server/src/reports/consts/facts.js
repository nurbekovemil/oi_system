// Изменение в составе Исполнительного органа
// Изменение в составе Совета Директоров
const fact1 = [
  {
    label: 'Орган управления, в котором произошли изменения',
    element: 'textarea',
    field: 'government_been_changes',
    required: false,
  },
  {
    label: 'ФИО каждого лица, полномочия которого прекращены',
    element: 'textarea',
    field: 'person_powers_terminated',
    required: false,
  },
  {
    label: 'Доля участия лица в уставном капитале эмитента',
    element: 'textarea',
    field: 'authorized_capital_issuer_1',
    required: false,
  },
  {
    label:
      'ФИО каждого лица, избранного (назначенного) в орган управления эмитента',
    element: 'textarea',
    field: 'person_elected_issuer_management',
    required: false,
  },
  {
    label: 'Доля участия лица в уставном капитале эмитента',
    element: 'textarea',
    field: 'authorized_capital_issuer_2',
    required: false,
  },
  {
    label:
      'Уполномоченный орган эмитента, принявший решение, являющееся основанием указанных изменений и дата его принятия',
    element: 'textarea',
    field: 'authorized_body_issuer',
    required: false,
  },
  {
    label: 'Иные обстоятельства, повлекшие указанные изменения',
    element: 'textarea',
    field: 'other_circumstances_changes',
    required: false,
  },
];
// Изменение размера участия члена Исполнительного органа в уставном капитале компаний
const fact2 = [
  {
    label: 'Фамилия, имя, отчество',
    element: 'textarea',
    field: 'full_name',
    required: false,
  },
  {
    label: 'Должность лица',
    element: 'textarea',
    field: 'position',
    required: false,
  },
  {
    label:
      'Наименование эмитента, его дочерних и зависимых обществ, в которых произошло изменение доли участия лица',
    element: 'textarea',
    field: 'issuer_name',
    required: false,
  },
  {
    label: 'Доля в уставном капитале до изменения',
    element: 'textarea',
    field: 'authorized_capital_before_change',
    required: false,
  },
  {
    label: 'Доля в уставном капитале после изменения',
    element: 'textarea',
    field: 'authorized_capital_after_change',
    required: false,
  },
  {
    label: 'Дата, с которой произошло изменение доли',
    element: 'textarea',
    field: 'date_from_share_change',
    required: false,
  },
];
//Изменение в списке владельцев ценных бумаг (физических лиц)
const fact3 = [
  {
    label: 'Фамилия, имя, отчество',
    element: 'textarea',
    field: 'full_name',
    required: false,
  },
  {
    label:
      'Доля в уставном капитале до изменения (в случае акций раздельно простых и привилегированных)',
    element: 'title',
    type: 'default',
    level: 5,
  },
  {
    label: 'Количество принадлежащих ценных бумаг',
    element: 'input',
    field: 'number_securities_held_1',
    required: false,
  },
  {
    label: 'В процентах от уставного капитала',
    element: 'input',
    field: 'percentage_authorized_capital_1',
    required: false,
  },
  {
    label: 'В денежном выражении',
    element: 'input',
    field: 'terms_money_1',
    required: false,
  },
  {
    label:
      'Доля в уставном капитале после изменения (в случае акций раздельно простых и привилегированных)',
    element: 'title',
    type: 'default',
    level: 5,
  },
  {
    label: 'Количество принадлежащих ценных бумаг',
    element: 'input',
    field: 'number_securities_held_2',
    required: false,
  },
  {
    label: 'В процентах от уставного капитала',
    element: 'input',
    field: 'percentage_authorized_capital_2',
    required: false,
  },
  {
    label: 'В денежном выражении',
    element: 'input',
    field: 'terms_money_2',
    required: false,
  },
  {
    label:
      'Дата, с которой произошли изменения доли участия в уставном капитале (доли ценных бумаг)',
    element: 'textarea',
    field: 'date_from_change_authorized_capital',
    required: false,
  },
];
//Изменение в списке владельцев ценных бумаг (юридических лиц)
const fact4 = [
  {
    label:
      'Полное наименование, местонахождение, почтовый адрес, код ОКПО юридического лица',
    element: 'textarea',
    field: 'full_info',
    required: false,
  },
  {
    label:
      'Доля в уставном капитале до изменения (в случае акций раздельно простых и привилегированных)',
    element: 'title',
    type: 'default',
    level: 5,
  },
  {
    label: 'Количество принадлежащих ценных бумаг',
    element: 'input',
    field: 'number_securities_held_1',
    required: false,
  },
  {
    label: 'В процентах от уставного капитала',
    element: 'input',
    field: 'percentage_authorized_capital_1',
    required: false,
  },
  {
    label: 'В денежном выражении',
    element: 'input',
    field: 'terms_money_1',
    required: false,
  },
  {
    label:
      'Доля в уставном капитале после изменения (в случае акций раздельно простых и привилегированных)',
    element: 'title',
    type: 'default',
    level: 5,
  },
  {
    label: 'Количество принадлежащих ценных бумаг',
    element: 'input',
    field: 'number_securities_held_2',
    required: false,
  },
  {
    label: 'В процентах от уставного капитала',
    element: 'input',
    field: 'percentage_authorized_capital_2',
    required: false,
  },
  {
    label: 'В денежном выражении',
    element: 'input',
    field: 'terms_money_2',
    required: false,
  },
  {
    label:
      'Дата, с которой произошли изменения доли участия в уставном капитале (доли ценных бумаг)',
    element: 'textarea',
    field: 'date_from_change_authorized_capital',
    required: false,
  },
];

//Изменение в списке юридических лиц, в которых эмитент владеет 20 и более процентами уставного капитала

const fact5 = [
  {
    label:
      'Полное наименование, а также местонахождение, почтовый адрес, код ОКПО юридического лица, доля участия в уставном капитале (доля ценных бумаг) которого, принадлежащая эмитенту, изменилась',
    element: 'textarea',
    field: 'full_info',
    required: false,
  },
  {
    label:
      'Доля эмитента в уставном капитале (доля ценных бумаг) юридического лица до ее изменения',
    element: 'textarea',
    field: 'issuer_authorized_capital_before',
    required: false,
  },
  {
    label:
      'Доля эмитента в уставном капитале (доля ценных бумаг) юридического лица после ее изменения',
    element: 'textarea',
    field: 'issuer_authorized_capital_after',
    required: false,
  },
  {
    label:
      'Дата, с которой произошло изменение доли в уставном капитале (доли ценных бумаг)',
    element: 'textarea',
    field: 'date_from_share_change',
    required: false,
  },
];
// Появление в реестре лица, владеющего более чем 5 процентами ценных бумаг (физическое лицо)
const fact6 = [
  {
    label: 'Фамилия, имя, отчество',
    element: 'textarea',
    field: 'full_name',
    required: false,
  },
  {
    label: 'Вид ценной бумаги',
    element: 'textarea',
    field: 'type_security',
    required: false,
  },
  {
    label: 'Доля в процентах',
    element: 'textarea',
    field: 'percentage_share',
    required: false,
  },
  {
    label: 'Дата, с которой произошли указанные изменения',
    element: 'textarea',
    field: 'date_from_said_changes',
    required: false,
  },
];
// Появление в реестре лица, владеющего более чем 5 процентами ценных бумаг (юридическое лицо)
const fact7 = [
  {
    label:
      'Полное наименование, местонахождение и почтовый адрес, код ОКПО юридического лица, приобретшего долю',
    element: 'textarea',
    field: 'full_info',
    required: false,
  },
  {
    label: 'Вид ценной бумаги',
    element: 'textarea',
    field: 'type_security',
    required: false,
  },
  {
    label: 'Доля в процентах',
    element: 'textarea',
    field: 'percentage_share',
    required: false,
  },
  {
    label: 'Дата, с которой произошли указанные изменения',
    element: 'textarea',
    field: 'date_from_said_changes',
    required: false,
  },
];

//Факт заключение договора или иного документа и/или или факт государственной регистрации такого договора,
//предметом которого является приобретение, получение или передача во временное пользование свыше одного года, либо отчуждение недвижимого имущества, независимо от площади недвижимого имущества
const fact8 = [
  {
    label:
      'Фамилия, имя, отчество или полное наименование, местонахождение и почтовый адрес стороны договора или иного документа',
    element: 'textarea',
    field: 'full_info',
    required: false,
  },
  {
    label: 'Описание недвижимого имущества',
    element: 'textarea',
    field: 'description_real_estate',
    required: false,
  },
  {
    label: 'Описание договора',
    element: 'textarea',
    field: 'description_contract',
    required: false,
  },
  {
    label: 'Дата совершения договора',
    element: 'textarea',
    field: 'date_contract',
    required: false,
  },
];

//Факт, повлекший разовое увеличение стоимости активов более чем на 10 процентов
const fact9 = [
  {
    label: 'Наименование факта (фактов)',
    element: 'textarea',
    field: 'name_fact',
    required: false,
  },
  {
    label: 'Дата появления факта (фактов)',
    element: 'textarea',
    field: 'date_occurrence_fact',
    required: false,
  },
  {
    label:
      'Величина активов эмитента на конец квартала, предшествующего месяцу, в котором появился соответствующий факт (факты)',
    element: 'textarea',
    field: 'issuer_end_quarter',
    required: false,
  },
  {
    label:
      'Изменение величины активов эмитента в абсолютном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт',
    element: 'textarea',
    field: 'absolute_ratio_month',
    required: false,
  },
  {
    label:
      'Изменение величины активов эмитента в процентном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт',
    element: 'textarea',
    field: 'percentage_per_month',
    required: false,
  },
];

const fact10 = [
  {
    label: 'Наименование факта (фактов)',
    element: 'textarea',
    field: 'name_fact',
    required: false,
  },
  {
    label: 'Дата появления факта (фактов)',
    element: 'textarea',
    field: 'date_occurrence_fact',
    required: false,
  },
  {
    label:
      'Значение прибыли эмитента на конец квартала, предшествующего месяцу, в котором появился соответствующий факт (факты)',
    element: 'textarea',
    field: 'issuer_value_profit_end_quarter',
    required: false,
  },
  {
    label:
      'Изменение прибыли эмитента в абсолютном соотношении в месяце, в котором произошел существенный факт по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт',
    element: 'textarea',
    field: 'absolute_profit_ratio_month',
    required: false,
  },
  {
    label:
      'Изменение убытков эмитента в процентном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт',
    element: 'textarea',
    field: 'percentage_loss_per_month',
    required: false,
  },
];

const fact11 = [
  {
    label: 'Наименование факта (фактов)',
    element: 'textarea',
    field: 'name_fact',
    required: false,
  },
  {
    label: 'Дата появления факта (фактов)',
    element: 'textarea',
    field: 'date_occurrence_fact',
    required: false,
  },
  {
    label:
      'Значение убытков эмитента на конец квартала, предшествующего месяцу, в котором появился соответствующий факт (факты)',
    element: 'textarea',
    field: 'issuer_value_profit_end_quarter',
    required: false,
  },
  {
    label:
      'Изменение прибыли эмитента в абсолютном соотношении в месяце, в котором произошел существенный факт по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт',
    element: 'textarea',
    field: 'absolute_profit_ratio_month',
    required: false,
  },
  {
    label:
      'Изменение убытков активов эмитента в процентном соотношении в месяце, в котором произошел факт, по сравнению с кварталом, предшествующим месяцу, в котором появился соответствующий факт',
    element: 'textarea',
    field: 'percentage_loss_per_month',
    required: false,
  },
];

//Реорганизация эмитента, его дочерних и зависимых обществ
const fact12 = [
  {
    label:
      'Полное наименование, местонахождение и почтовый адрес реорганизуемого юридического лица (юридических лиц, участвующих в реорганизации)',
    element: 'textarea',
    field: 'full_info',
    required: false,
  },
  {
    label:
      'Вид реорганизации (слияние, присоединение, разделение, выделение, преобразование)',
    element: 'textarea',
    field: 'type_reorganization',
    required: false,
  },
  {
    label:
      'Уполномоченный орган, принявший решение, являющееся основанием реорганизации, и дата его принятия',
    element: 'textarea',
    field: 'authorized_body',
    required: false,
  },
  {
    label: 'Способ и порядок размещения ценных бумаг при реорганизации',
    element: 'textarea',
    field: 'method_order_placement',
    required: false,
  },
  {
    label:
      'Дата реорганизации (дата государственной регистрации организации, созданной в результате слияния, разделения, выделения, преобразования; дата внесения в реестр записи о прекращении деятельности присоединенной организации)',
    element: 'textarea',
    field: 'date_reorganization',
    required: false,
  },
];

//Начисленные доходы по ценным бумагам (дивиденды)
const fact13 = [
  {
    label: 'Дата принятия решения о выплате дивидендов',
    element: 'textarea',
    field: 'date_confirm',
    required: false,
  },
  {
    label: 'Размер дивиденда на 1 ценную бумагу (сом)',
    element: 'textarea',
    field: 'dividend_amount',
    required: false,
  },
  {
    label: 'Форма выплаты',
    element: 'textarea',
    field: 'payment_form',
    required: false,
  },
  {
    label: 'Место выплаты',
    element: 'textarea',
    field: 'place_payment',
    required: false,
  },
  {
    label: 'Дата выплаты',
    element: 'textarea',
    field: 'payment_date',
    required: false,
  },
  {
    label: 'Дата регистрации акционеров, имеющих право на получение дивидендов',
    element: 'textarea',
    field: 'date_registration_shareholders',
    required: false,
  },
];

//Выплаченные доходы по ценным бумагам (дивиденды)
const fact14 = [
  {
    label: 'Период выплаты дивидендов',
    element: 'textarea',
    field: 'dividend_payment_period',
    required: false,
  },
  {
    label: 'Количество акционеров, имеющих право на получение дивидендов',
    element: 'textarea',
    field: 'number_shareholders_receive_dividends',
    required: false,
  },
  {
    label: 'Общая сумма начисленных дивидендов (сом)',
    element: 'textarea',
    field: 'total_amount_accrued_dividends',
    required: false,
  },
  {
    label: 'Количество акционеров, получивших дивиденды',
    element: 'textarea',
    field: 'number_shareholders_who_received_dividends',
    required: false,
  },
  {
    label: 'Общая сумма выплаченных дивидендов (сом)',
    element: 'textarea',
    field: 'total_amount_dividends_paid',
    required: false,
  },
  {
    label: 'Количество акционеров, которым не выплачены дивиденды',
    element: 'textarea',
    field: 'number_shareholders_not_paid_dividends',
    required: false,
  },
  {
    label: 'Общая сумма не выплаченных дивидендов (сом)',
    element: 'textarea',
    field: 'total_unpaid_dividends',
    required: false,
  },
  {
    label: 'Количество ценных бумаг, по которым не выплачены дивиденды',
    element: 'textarea',
    field: 'number_securities_dividends_not_paid',
    required: false,
  },
  {
    label: 'Причина невыплаты',
    element: 'textarea',
    field: 'reason_non_payment',
    required: false,
  },
];
//Начисленные доходы по облигациям
const fact15 = [
  {
    label: 'Номер выпуска',
    element: 'textarea',
    field: 'issue_number',
    required: false,
  },
  {
    label: 'Ставка доходности',
    element: 'textarea',
    field: 'rate_return',
    required: false,
  },
  {
    label: 'Номинальная стоимость облигации',
    element: 'textarea',
    field: 'par_value_bond',
    required: false,
  },
  {
    label: 'Дата начала выплаты дохода',
    element: 'textarea',
    field: 'start_date_income_payment',
    required: false,
  },
  {
    label:
      'Дата составления списка владельцев ценных бумаг для получения дохода',
    element: 'textarea',
    field: 'date_compilation_list',
    required: false,
  },
  {
    label: 'Форма выплаты',
    element: 'textarea',
    field: 'payment_form',
    required: false,
  },
  {
    label: 'Место выплаты',
    element: 'textarea',
    field: 'payment_place',
    required: false,
  },
];

//Выплаченные доходы по облигациям
const fact16 = [
  {
    label: 'Номер выпуска',
    element: 'textarea',
    field: 'issue_number',
    required: false,
  },
  {
    label: 'Количество владельцев облигаций, имеющих право на получение дохода',
    element: 'textarea',
    field: 'number_bond_holders',
    required: false,
  },
  {
    label: 'Сумма начисленных доходов (сом)',
    element: 'textarea',
    field: 'amount_accrued_income',
    required: false,
  },
  {
    label: 'Количество владельцев облигаций, получивших доходы',
    element: 'textarea',
    field: 'number_bond_holders_received_income',
    required: false,
  },
  {
    label: 'Сумма выплаченного дохода по облигациям (сом)',
    element: 'textarea',
    field: 'amount_bond_yield_paid',
    required: false,
  },
  {
    label: 'Количество владельцев облигаций, которым не выплачены доходы',
    element: 'textarea',
    field: 'number_bond_holders_not_paid',
    required: false,
  },
  {
    label: 'Сумма невыплаченного дохода по облигациям (сом)',
    element: 'textarea',
    field: 'amount_bond_yield_not_paid',
    required: false,
  },
  {
    label: 'Количество облигаций, по которым не выплачены доходы',
    element: 'textarea',
    field: 'number_bond_not_paid',
    required: false,
  },
  {
    label: 'Причина невыплаты',
    element: 'textarea',
    field: 'reason_non_payment',
    required: false,
  },
];

//Решения, принятые общим собранием акционеров
const fact17 = [
  {
    label: 'Дата проведения общего собрания',
    element: 'textarea',
    field: 'date_general_meeting',
    required: false,
  },
  {
    label: 'Вид общего собрания (годовое, внеочередное)',
    element: 'textarea',
    field: 'type_general_meeting',
    required: false,
  },
  {
    label: 'Форма проведения общего собрания',
    element: 'textarea',
    field: 'form_general_meeting',
    required: false,
  },
  {
    label: 'Место проведения общего собрания',
    element: 'textarea',
    field: 'place_general_meeting',
    required: false,
  },
  {
    label: 'Кворум общего собрания',
    element: 'textarea',
    field: 'quorum_general_meeting',
    required: false,
  },
  {
    label:
      'Вопросы, поставленные на голосование, итоги голосования и принятые решения',
    element: 'textarea',
    field: 'issues_voting_decisions_taken',
    required: false,
  },
];
//Погашение ценных бумаг эмитента
const fact18 = [
  {
    label: 'Основание погашения (аннулирования)',
    element: 'textarea',
    field: 'basis_redemption',
    required: false,
  },
  {
    label:
      'Решение об уменьшении уставного капитала путем погашения акций, конвертации, погашения облигаций',
    element: 'textarea',
    field: 'reduction_authorized_capital',
    required: false,
  },
  {
    label:
      'Вид, категория, форма, серия, государственный регистрационный номер выпуска, ценные бумаги которого погашаются',
    element: 'textarea',
    field: 'kind_category_form_series',
    required: false,
  },
  {
    label:
      'Цена размещения каждой ценной бумаги данного вида (категории); серии, количество ценных бумаг данного вида (категории), серии; количество погашенных ценных бумаг',
    element: 'textarea',
    field: 'placement_price_each_security',
    required: false,
  },
  {
    label:
      'В случае погашения (в том числе досрочного) облигаций: срок (дата начала, дата окончания) обращения погашенных облигаций; порядок, условия, срок (дата начала и дата окончания) досрочного погашения облигаций (если досрочное погашение предусмотрено решением о выпуске облигаций); порядок, условия, срок (дата начала и дата окончания) погашения облигаций',
    element: 'textarea',
    field: 'case_redemption',
    required: false,
  },
];
// Выход эмитента из статуса публичной компании
const fact19 = [
  {
    label: 'Наименование публичной компании',
    element: 'textarea',
    field: 'name_public_company',
    required: false,
  },
  {
    label: 'Юридический адрес',
    element: 'textarea',
    field: 'org_address',
    required: false,
  },
  {
    label:
      'Вид ценных бумаг, торговля которыми осуществляется на фондовой бирже',
    element: 'textarea',
    field: 'type_securities',
    required: false,
  },
  {
    label: 'Дата рассмотрения вопроса о выходе из статуса публичной компании',
    element: 'textarea',
    field: 'date_consideration_issue',
    required: false,
  },
];
// Размещение облигаций
const fact20 = [
  {
    label: 'Адрес компании',
    element: 'textarea',
    field: 'company_address',
    required: false,
  },
  {
    label: 'Дата и номер государственной регистрации выпуска',
    element: 'textarea',
    field: 'date_and_number_org_reg',
    required: false,
  },
  {
    label: 'Дата начала размещения',
    element: 'textarea',
    field: 'start_date_accommodation',
    required: false,
  },
  {
    label: 'Количество облигаций выпуска',
    element: 'textarea',
    field: 'number_bonds_issue',
    required: false,
  },

  {
    label: 'Цена размещения 1 (одной) облигации',
    element: 'textarea',
    field: 'price_accommodation',
    required: false,
  },
  {
    label: 'Общая сумма эмиссии',
    element: 'textarea',
    field: 'total_amount_emissions',
    required: false,
  },
  {
    label: 'Доходность облигации',
    element: 'textarea',
    field: 'bond_yield',
    required: false,
  },
  {
    label: 'Срок обращения',
    element: 'textarea',
    field: 'term_circulation',
    required: false,
  },
  {
    label: 'Порядок размещения',
    element: 'textarea',
    field: 'placement_order',
    required: false,
  },
  {
    label: 'Порядок выплаты процентного дохода',
    element: 'textarea',
    field: 'procedure_payment_interest',
    required: false,
  },
  {
    label: 'Дата погашения',
    element: 'textarea',
    field: 'maturity_date',
    required: false,
  },
  {
    label: 'Дополнительная информация',
    element: 'textarea',
    field: 'additional_information',
    required: false,
  },
];
console.log(JSON.stringify(fact20));
