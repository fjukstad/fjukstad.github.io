---
title: Synthetic Patient Data
date: 2020-12-14
author: Bjørn Fjukstad
---

When we're developing software systems, it's useful to fill them with data to
illustrate and test how they work. For example, to show that the online store we
are developing works as expected, we fill it up with products that we can
purchase.
Likewise, when we're developing electronic health record (EHR) systems, it's
useful to fill them up with patient data.

While we can use real products to fill online stores,
we cannot fill the EHR system we are developing with real patient data.
Therefore, we need tools that generate realistic, but not real, patient data.
The data for every type of patient needs to make sense.
For example, a normal blood pressure for a child is far lower than for an adult,
and it does not make sense for the average female patients to have
[vasectomies](https://en.wikipedia.org/wiki/Vasectomy) in their patient
histories.

[Synthea](https://github.com/synthetichealth/synthea) is a great project that
generates realistic patient data and associated health
records in lots of different formats, such as [FHIR](https://hl7.org/FHIR/). By
default, the patients in Synthea are from Massachusetts in the US, but there is a
[synthea-international](https://github.com/synthetichealth/synthea-international)
repository with configuration files for international locations.

`synthea-international` already had Norwegian hospitals, but unfortunately it
only had support for English and Finnish names. Last week we organized our
hackathon, `d:hack`, at [DIPS](http://dips.no/), so [I decided to add support for
Norwegian names.](https://github.com/synthetichealth/synthea-international/pull/7)

When you now run `synthea-international` to generate Norwegian resources (See
[synthea-international](https://github.com/synthetichealth/synthea-international)
for more information), you get patients with Norwegian names.
For example, to generate five patients from Bodø, Norway, you can run

```sh
./run_synthea -p 5 Nordland Bodø
```

This command will generate five
[FHIR Bundles](https://www.hl7.org/fhir/bundle.html)
that contain the complete patient histories for each patient.  Here's an excerpt
from the synthetic patient history of a patient `Sophie40 Utgård849` who was
treated by `Dr. Amar285 Sønsteby262` at `Nordlandssykehuset` in Bodø:

```json
...
 {
   "resource": {
     "resourceType": "Encounter",
     "status": "finished",
     "class": {
       "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
       "code": "AMB"
     },
     "type": [
       {
         "coding": [
           {
             "system": "http://snomed.info/sct",
             "code": "410620009",
             "display": "Well child visit (procedure)"
           }
         ]
       }
     ],
     "subject": {
       "display": "Sophie40 Utgård849"
     },
     "participant": [
       {
         "type": [
           {
             "coding": [
               {
                 "system": "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                 "code": "PPRF",
                 "display": "primary performer"
               }
             ]
           }
         ],
         "individual": {
           "display": "Dr. Amar285 Sønsteby262"
         }
       }
     ],
     "serviceProvider": {
       "display": "Nordlandsykehuset"
     }
   },
 },
...
```

From these FHIR bundles we can now populate our EHR with realistic Norwegian
patients!
