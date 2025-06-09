# 3. Manejar excepcions (try - catch - finally)

## 3.1. Manejadors d'excepcions

El maneig d'excepcions es gestiona amb tres blocs que actuen conjuntament:

- Bloc `try` (intentar): codi que podria llançar una excepció.
- Bloc `catch`/`except` (capturar): codi que manejarà l'excepció si és llançada.
- Bloc `finally` (finalment): codi que s'executa tant si hi ha excepció com si no.

>[!IMPORTANT] <strong>IMPORTANT!:</strong>
>Un **gestor d'excepcions** és un fragment de codi dissenyat per interceptar un error en temps d'execució i **impedir que l'excepció es propague** sense control fins al punt d'entrada principal, causant la finalització abrupta del programa.

Normalment és obligatori tenir almenys un bloc de captura associat al `try`. El bloc `finally` és opcional però útil quan cal assegurar-se que certes instruccions s'executen sempre, independentment de si ha ocorregut una excepció.

::: tabs
== Java

```java
try {
    // Instruccions que podrien llançar una excepció.
}
catch (TipusExcepcio nomVariable) {
    // Instruccions que s'executen quan ‘try' llança una excepció.
}
finally {
    // Instruccions que s'executen tant si hi ha excepció com si no.
}
```

:::

**El bloc try intentarà executar el codi**. Si es produeix una excepció, la resta d'instruccions d'aquest bloc s'ometen i es passa directament al primer catch compatible.

**El bloc catch capturarà les excepcions** del tipus <i>TipusExcepcio</i>, evitant que siga llançada al mètode que ens va cridar. Ací haurem d'escriure les instruccions que siguen necessàries per a manejar l'error. Poden especificar-se diversos blocs catch per a diferents tipus d'excepcions. Si el `try` conclou sense errors, tots els blocs `catch` s'ignoren.

**El bloc finally és opcional** i s'executarà tant si s'ha llançat una excepció com si no.

Vegem un exemple senzill.

## 3.2. Exemple 4

:::: tabs
=== Java

::: tabs
== Codi

```java
public static void main(String args[]){
  int x = 1, y = 0;
  try{
    int div = x / y;
    System.out.println("L'execució no arribarà ací.");
  }catch(ArithmeticException e){
    System.out.println("Has intentat dividir entre 0.");
  }finally{
    System.out.println("Final del programa.");
  }
}
```

== Eixida

```plaintext
Has intentat dividir entre 0.
Final del programa.
```

:::

En intentar dividir per zero es llança automàticament una *ArithmeticException*. Com això succeeix dins del bloc try, l'execució del programa passa al primer bloc catch perquè coincideix amb el tipus d'excepció produïda (*ArithmeticException*). S'executarà el codi del bloc catch i després el programa continuarà amb normalitat.

::::

## 3.3. Particularitats de la clàusula catch (Java)

:::: tabs
=== Java

És important entendre que **el bloc `catch` sols capturarà excepcions del tipus indicat**. Si es produeix una excepció diferent no la capturarà. No obstant això, **capturarà excepcions heretades del tipus indicat**. Per exemple, `catch (ArithmeticException e)` capturarà qualsevol tipus d'excepció que herete de `ArithmeticException`. El cas més general és `catch (Exception e)` que capturarà tot tipus d'excepcions perquè **a Java totes les excepcions hereten de Exception**.

No obstant això, és millor utilitzar excepcions el més pròximes a la mena d'error previst, ja que el que es pretén és recuperar el programa d'alguna condició d'error i si "es fiquen totes les excepcions en el mateix sac", segurament caldrà esbrinar després quina condició d'error es va produir per a poder donar una resposta adequada.

**L'objectiu d'una clàusula `catch` és resoldre la condició excepcional perquè el programa puga continuar com si l'error mai haguera ocorregut.**

::::

## 3.4. Clàusules catch múltiples

Es poden especificar diverses clàusules `catch`, tantes com vulguem, perquè cadascuna capture un
tipus diferent d'excepció.

::: tabs
== Java

```java
try {
  // instruccions que poden produir diferents tipus d'Excepcions
}
catch (TipusExcepcio1 e1) {
  // instruccions per a manejar un TipusExcepcio1
}
catch (TipusExcepcio2 e2) {
  // instruccions per a manejar un TipusExcepcio2
}
...

catch (TipusExcepcioN eN) {
  // instruccions per a manejar un TipusExcepcioN
}
finally { // opcional
  // instruccions que s'executaran tant si hi ha excepció com si no
}
```

>[!WARNING] <strong>ATENCIÓ!:</strong>
>Si el tipus excepció produïda no coincideix amb cap dels catch, llavors l'excepció serà llançada al mètode que ens va cridar*.

:::

Quan es llança una excepció dins del `try`, **es comprova cada sentència `catch` en ordre i s'executa la primera el tipus de la qual coincidisca amb l'excepció llançada**. Els altres blocs `catch` seran ignorats. Després s'executarà el bloc `finally` (si s'ha definit) i el programa continuarà la seua execució després del bloc `try-catch-finally`.

Vegem un exemple amb clàusules `catch` múltiples.

## 3.5. Exemple 5

::: tabs
== Java

```java
public class Exemple_excepcions{
  public static void main(String args[]){
    int x, y, div, pos;
    int[] v = {1,2,3};
    Scanner in = new Scanner(System.in);

    try{
      System.out.print("Introdueix el numerador: ");
      x = in.nextInt();

      System.out.print("Introdueix el denominador: ");
      y = in.nextInt();

      div = x / y;

      System.out.print("La divisió és  " + div);

      System.out.print("Introdueix la posició del vector a consultar: ");
      pos = in.nextInt();

      System.out.print("l'element és: " + v[pos]);
    }catch (ArithmeticException e) {
      System.out.print("Divisió per zero: " + e);
    }catch (ArrayIndexOutOfBoundsException e) {
      System.out.print("Sobrepassat el tamany del vector: " + e);
    }
    System.out.print("Final del programa ");
  }
}
```

:::

Poden succeir tres coses diferents:

- El try s'executa sense excepcions, s'ignoren els catch i s'imprimeix "Fin del programa".
- Es produeix l'excepció de divisió per zero, el flux d'execució salta al 1er catch, s'imprimeix el missatge "Divisió per zero..." i després "Final del programa".
- Es produeix l'excepció de sobrepassar el vector, el flux d'execució salta al segon catch, s'imprimeix el missatge "Sobrepassat el tamany del vector:..." i "Final del programa".

## 3.6. L’objecte d’excepció

En molts llenguatges orientats a objectes, **cada excepció es representa com un objecte** que encapsula informació sobre l’error: el tipus d’excepció, un missatge descriptiu i, sovint, la traça de pila. Aquests objectes permeten:

- **Informar l’usuari** del que ha passat, mostrant un missatge entenedor.
- **Facilitar la depuració**, oferint detalls tècnics perquè el desenvolupador localitze l’origen del problema i el corregeixi.

Quan capturem una excepció, rebem aquest objecte al nostre gestor i podem invocar-ne mètodes per a obtenir informació addicional o imprimir-la.

---

::: tabs
== Java

En Java, un objecte *Exception* (o que derive d'aquesta classe) té accés als següent mètodes:

- **`toString()`**: el tenen precarregat, amb la qual cosa es pot cridar directament.
- **`getMessage()`**: retorna un text senzill que descriu l’error.
- **`printStackTrace()`**: imprimeix el tipus d’excepció, el missatge i la traça de crides completa, ajudant a veure exactament on s’ha produït l’error.

```java
catch (Exception e) {
    // Mostrem un missatge senzill per a l'usuari
    System.err.println("Error: " + e.getMessage());
    // Imprimim la traça completa de la pila per a depuració
    e.printStackTrace();
}
```

```java
catch (Exception e) {
    // També podem confiar en toString(), que inclou tipus i missatge
    System.out.println(e);
}
```

:::
